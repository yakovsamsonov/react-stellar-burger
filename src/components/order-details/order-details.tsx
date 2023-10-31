import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderDetailsStyle from './order-details.module.css';
import { useMemo, useState, useEffect, FC } from 'react';
import { getDetails } from '../../services/actions';
import {
  OrderStateSingle,
  getDateLabel,
  TOrderIngredient,
  TIngredient,
  TOrder,
} from '../../utils';
import { Price } from '../price/price';
import { IngredientRow } from '../ingredient-row/ingredient-row';
import {
  details as detailsSelector,
  ingredients as ingredientsSelector,
} from '../../services/selectors/selectors';

export const OrderDetails: FC = () => {
  const { detailsData } = useSelector<
    any,
    {
      detailsData: TOrder;
    }
  >(detailsSelector);
  const { ingredients: allIngredients } = useSelector(ingredientsSelector);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [ingData, setIngData] = useState<Array<TOrderIngredient>>([]);

  const { num } = useParams();
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getDetails(num));
  }, [dispatch, num]);

  useEffect(() => {
    if (detailsData.status) {
      const data: Array<TOrderIngredient> = [];
      detailsData.ingredients.forEach((ing) => {
        const ingData = allIngredients.find(
          (el: TIngredient) => el._id === ing
        );
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
    }
  }, [allIngredients, detailsData]);

  const statusClassNames: string = useMemo((): string => {
    let extra = '';
    if (detailsData.status === 'done') {
      extra = OrderDetailsStyle['order-details__status_done'];
    }
    return `${OrderDetailsStyle['order-details__status']} ${extra}`;
  }, [detailsData.status]);

  const orderPrice: number = useMemo((): number => {
    let orderPrice = 0;
    ingData.forEach((ing) => {
      orderPrice = orderPrice + ing.price * ing.count;
    });
    return orderPrice;
  }, [ingData]);

  useEffect(() => {
    setTotalPrice(orderPrice);
  }, [orderPrice]);

  if (!detailsData.status) {
    return (
      <div className={OrderDetailsStyle['order-details']}>
        <p className={OrderDetailsStyle['order-details__name']}>
          {`Загрузка данных по заказу #${num}`}
        </p>
      </div>
    );
  } else {
    return (
      <div className={OrderDetailsStyle['order-details']}>
        <p className={OrderDetailsStyle['order-details__number']}>#{num}</p>
        <p className={OrderDetailsStyle['order-details__name']}>
          {detailsData.name}
        </p>
        <p className={statusClassNames}>
          {OrderStateSingle[detailsData.status]}
        </p>
        <p className={OrderDetailsStyle['order-details__name']}>Состав:</p>
        <div className={OrderDetailsStyle['order-details__container']}>
          {ingData.map((ing, ind) => (
            <IngredientRow key={ind} ingredient={ing}></IngredientRow>
          ))}
        </div>
        <div className={OrderDetailsStyle['order-details__row']}>
          <p className={OrderDetailsStyle['order-details__date']}>
            {getDateLabel(detailsData.createdAt)}
          </p>
          <Price price={totalPrice}></Price>
        </div>
      </div>
    );
  }
};
