import FeedListStyle from './feed-list.module.css';
import { OrderSummary } from '../order-summary/order-summary';
import { useSelector } from 'react-redux';
import { useEffect, useState, FC } from 'react';
import { orderHistory } from '../../services/selectors/selectors';
import { TOrder } from '../../utils';

export const FeedList: FC<{
  showStatus: boolean;
}> = ({ showStatus }) => {
  const { orders } = useSelector<any, { orders: Array<TOrder> }>(orderHistory);
  const [isListLoaded, setIsListLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (orders.length > 0) {
      setIsListLoaded(true);
    }
  }, [orders]);

  if (isListLoaded) {
    return (
      <section
        className={`${FeedListStyle.section} ${FeedListStyle.section_scroll}`}
      >
        {orders.map((order) => (
          <OrderSummary key={order._id} order={order} showStatus={showStatus} />
        ))}
      </section>
    );
  } else {
    return (
      <section className={FeedListStyle.section}>
        <p>Заказов нет</p>
      </section>
    );
  }
};