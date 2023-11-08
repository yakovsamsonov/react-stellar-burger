import FeedListStyle from './feed-list.module.css';
import { OrderSummary } from '../order-summary/order-summary';
import { useSelector } from 'react-redux';
import { useEffect, useState, FC } from 'react';
import { orderHistory } from '../../services/selectors/selectors';

export const FeedList: FC<{
  showStatus?: boolean;
}> = ({ showStatus = false }) => {
  const { orders } = useSelector(orderHistory);
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
  }
  return (
    <section className={FeedListStyle.section}>
      <p>Заказов нет</p>
    </section>
  );
};
