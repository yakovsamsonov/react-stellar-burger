import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import OrderSummaryStyle from './order-summary.module.css';
import { useState, useMemo, useEffect, FC } from 'react';
import {
  OrderStateSingle,
  TOrderIngredient,
  getDateLabel,
  TOrder,
  TIngredient,
} from '../../utils';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { Price } from '../price/price';
import { ingredients as ingredientsSelector } from '../../services/selectors/selectors';

type TOrderSummary = {
  order: TOrder;
  showStatus: boolean;
};

export const OrderSummary: FC<TOrderSummary> = ({ order, showStatus }) => {
  const { ingredients: allIngredients } = useSelector(ingredientsSelector);
  const [price, setPrice] = useState<number>(0);
  const [ingData, setIngData] = useState<Array<TOrderIngredient>>([]);
  const [extraItems, setExtraItems] = useState<number>(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const data: Array<TOrderIngredient> = [];
    order.ingredients.forEach((ing) => {
      const ingData = allIngredients.find((el: TIngredient) => el._id === ing);
      if (ingData) {
        const elIndex = data.findIndex((item) => item._id === ing);
        if (elIndex !== -1) {
          data[elIndex].count = data[elIndex].count + 1;
        } else {
          data.push({
            ...ingData,
            count: 1,
          });
        }
      }
    });
    setIngData(data);
    setExtraItems(data.length - 5);
  }, [allIngredients, order.ingredients]);

  const statusClassNames: string = useMemo((): string => {
    let extra = '';
    if (order.status === 'done') {
      extra = OrderSummaryStyle['order__summary-status_done'];
    }
    return `${OrderSummaryStyle['order__summary-status']} ${extra}`;
  }, [order.status]);

  const orderPrice: number = useMemo((): number => {
    let orderPrice = 0;
    ingData.forEach((ing) => {
      orderPrice = orderPrice + ing.price * ing.count;
    });
    return orderPrice;
  }, [ingData]);

  useEffect(() => {
    setPrice(orderPrice);
  }, [orderPrice]);

  return (
    <Link
      to={`${order.number}`}
      className={OrderSummaryStyle['order__link']}
      state={{ backgroundLocation: pathname }}
    >
      <article className={OrderSummaryStyle['order__summary-box']}>
        <div className={OrderSummaryStyle['order__summary-row']}>
          <p className={OrderSummaryStyle['order__summary-number']}>
            #{order.number}
          </p>
          <p className={OrderSummaryStyle['order__summary-date']}>
            {getDateLabel(order.createdAt)}
          </p>
        </div>
        <div className={OrderSummaryStyle['order__summary-group']}>
          <h3 className={OrderSummaryStyle['order__summary-name']}>
            {order.name}
          </h3>
          {showStatus ? (
            <p className={statusClassNames}>{OrderStateSingle[order.status]}</p>
          ) : (
            <></>
          )}
        </div>
        <div className={OrderSummaryStyle['order__summary-row']}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {ingData.slice(0, 5).map((el, ind) => (
              <IngredientIcon key={ind} order={ind} image={el.image} />
            ))}
            {ingData.length > 5 ? (
              <IngredientIcon
                key={5}
                order={5}
                image={ingData[5]['image']}
                label={`+${extraItems}`}
              />
            ) : (
              <></>
            )}
          </div>
          <Price price={price}></Price>
        </div>
      </article>
    </Link>
  );
};
