import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import OrderSummaryStyle from './order-summary.module.css';
import { useState, useMemo, useEffect } from 'react';
import { orderState, getDateLabel } from '../../utils';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { Price } from '../price/price';
import PropTypes from 'prop-types';

export default function OrderSummary({ order, showStatus }) {
  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  const [price, setPrice] = useState(0);
  const [ingData, setIngData] = useState([]);
  const [extraItems, setExtraItems] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const data = [];
    order.ingredients.forEach((ing) => {
      const ingData = allIngredients.find((el) => el._id === ing);
      if (ingData) {
        const elIndex = data.findIndex((item) => item.id === ing);
        if (elIndex !== -1) {
          data[elIndex].count = data[elIndex].count + 1;
        } else {
          data.push({
            id: ingData._id,
            image: ingData.image,
            price: ingData.price,
            count: 1,
          });
        }
      }
    });
    setIngData(data);
    setExtraItems(data.length - 5);
  }, [allIngredients, order.ingredients]);

  const statusClassNames = useMemo(() => {
    let extra = '';
    if (order.status === 'done') {
      extra = OrderSummaryStyle['order__summary-status_done'];
    }
    return `${OrderSummaryStyle['order__summary-status']} ${extra}`;
  }, [order.status]);

  const orderPrice = useMemo(() => {
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
      state={{ backgroundLocation: location.pathname }}
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
            <p className={statusClassNames}>{orderState[order.status][0]}</p>
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
}

OrderSummary.propTypes = {
  order: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  showStatus: PropTypes.bool,
};
