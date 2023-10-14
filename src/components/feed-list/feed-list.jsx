import FeedListStyle from './feed-list.module.css';
import OrderSummary from '../order-summary/order-summary';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function FeedList({ status }) {
  const { orders } = useSelector((store) => store.ws);
  const [isListLoaded, setIsListLoaded] = useState(false);

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
          <OrderSummary key={order._id} order={order} showStatus={status} />
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
}

FeedList.propTypes = {
  status: PropTypes.bool,
};
