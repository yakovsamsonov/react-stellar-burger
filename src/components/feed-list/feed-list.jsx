import FeedListStyle from './feed-list.module.css';
import OrderSummary from '../order-summary/order-summary';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function FeedList() {
  const { orders } = useSelector((store) => store.ws);
  const [isListLoaded, setIsListLoaded] = useState(false);

  useEffect(() => {
    if (orders.length > 0) {
      setIsListLoaded(true);
    }
  }, [orders]);

  return (
    <section className={`${FeedListStyle.section} custom-scroll`}>
      {isListLoaded ? (
        orders.map((order) => <OrderSummary key={order._id} order={order} />)
      ) : (
        <></>
      )}
    </section>
  );
}
