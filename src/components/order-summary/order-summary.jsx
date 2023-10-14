import { useSelector } from 'react-redux';
import OrderSummaryStyle from './order-summary.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { BUN_TYPE } from '../../utils/constants';
import { orderState } from '../../utils/constants';

export default function OrderSummary({ order, showStatus }) {
  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  const [price, setPrice] = useState(0);
  const [ingData, setIngData] = useState([]);
  const [extraItems, setExtraItems] = useState(0);

  useEffect(() => {
    const data = [];
    order.ingredients.forEach((ing) => {
      const ingData = allIngredients.find((el) => el._id === ing);
      if (ingData) {
        data.push({
          image: ingData.image,
          type: ingData.type,
          price: ingData.price,
        });
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

  const getDateLabel = useCallback((order) => {
    const currentTime = new Date();
    const orderTime = new Date(order);
    const daysBetween = Math.floor(currentTime.getDate() - orderTime.getDate());

    let periodLabel = '';
    switch (daysBetween) {
      case 0: {
        periodLabel = 'Сегодня';
        break;
      }
      case 1: {
        periodLabel = 'Вчера';
        break;
      }
      case 2: {
        periodLabel = '2 дня назад';
        break;
      }
      default: {
        periodLabel = `${daysBetween} дней назад`;
      }
    }

    return `${periodLabel}, ${orderTime.getHours()}:${
      orderTime.getMinutes() < 10
        ? `0${orderTime.getMinutes()}`
        : orderTime.getMinutes()
    } i-GMT+${-orderTime.getTimezoneOffset() / 60}`;
  }, []);

  const orderPrice = useMemo(() => {
    let orderPrice = 0;
    ingData.forEach((ing) => {
      if (ing.type === BUN_TYPE) {
        orderPrice = orderPrice + ing.price * 2;
      } else {
        orderPrice = orderPrice + ing.price;
      }
    });
    return orderPrice;
  }, [ingData]);

  useEffect(() => {
    setPrice(orderPrice);
  }, [orderPrice]);

  return (
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <p className={OrderSummaryStyle['order__summary-price']}>{price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </article>
  );
}

function IngredientIcon({ order, image, label }) {
  return (
    <div
      key={order}
      className={OrderSummaryStyle['order__summary-picture-box']}
      style={{
        position: 'relative',
        left: `-${order * 16}px`,
        zIndex: `${100 - order}`,
      }}
    >
      {label ? (
        <p className={OrderSummaryStyle['order__summary-picture-label']}>
          {label}
        </p>
      ) : (
        <></>
      )}
      <img
        className={OrderSummaryStyle['order__summary-picture']}
        alt=""
        src={image}
      />
    </div>
  );
}
