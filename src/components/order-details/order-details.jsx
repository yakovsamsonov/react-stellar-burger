import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderDetailsStyle from './order-details.module.css';
import { useMemo, useState, useEffect } from 'react';
import { getDetails } from '../../services/actions';
import { orderState, getDateLabel, BUN_TYPE } from '../../utils';
import Price from '../price/price';
import IngredientRow from '../ingredient-row/ingredient-row';

export default function OrderDetails() {
  const { detailsData } = useSelector((store) => store.details);
  const allIngredients = useSelector((store) => store.ingredients.ingredients);

  const [totalPrice, setTotalPrice] = useState(0);
  const [ingData, setIngData] = useState([]);

  const { num } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(num));
  }, [dispatch, num]);

  useEffect(() => {
    if (detailsData.status) {
      const data = [];
      detailsData.ingredients.forEach((ing) => {
        const ingData = allIngredients.find((el) => el._id === ing);
        if (ingData) {
          data.push({
            image: ingData.image,
            type: ingData.type,
            price: ingData.price,
            name: ingData.name,
          });
        }
      });
      setIngData(data);
    }
  }, [allIngredients, detailsData]);

  const statusClassNames = useMemo(() => {
    let extra = '';
    if (detailsData.status === 'done') {
      extra = OrderDetailsStyle['order-details__status_done'];
    }
    return `${OrderDetailsStyle['order-details__status']} ${extra}`;
  }, [detailsData.status]);

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
        <p className={statusClassNames}>{orderState[detailsData.status][0]}</p>
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
}
