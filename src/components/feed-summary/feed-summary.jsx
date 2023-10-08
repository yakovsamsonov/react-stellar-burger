import { useSelector } from 'react-redux';
import FeedSummaryStyle from './feed-summary.module.css';

const orderState = {
  done: ['Выполнен', 'Готовы'],
  pending: ['Готовится', 'В работе'],
  created: ['Создан', 'Обработка'],
};

export default function FeedSummary() {
  const { orders, total, totalToday } = useSelector((store) => store.ws);

  const getNumbersByStatus = (status) => {
    return orders.filter((el) => el.status === status).map((el) => el.number);
  };

  return (
    <section className={FeedSummaryStyle['feed-summary']}>
      <div className={FeedSummaryStyle['feed-summary__orders-box']}>
        <OrderNumBox
          status={'done'}
          numList={getNumbersByStatus('done')}
        ></OrderNumBox>
        <OrderNumBox
          status={'pending'}
          numList={getNumbersByStatus('pending')}
        ></OrderNumBox>
      </div>
      <>
        <Stat label={'Выполнено за все время'} value={total}></Stat>
        <Stat label={'Выполнено за сегодня'} value={totalToday}></Stat>
      </>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <h3 className={FeedSummaryStyle['stat__label']}>{label}:</h3>
      <p className={FeedSummaryStyle['stat__value']}>{value}</p>
    </div>
  );
}

function OrderNumBox({ status, numList }) {
  const numClassNames = () => {
    let extra = '';
    if (status === 'done') {
      extra = FeedSummaryStyle['order-stat__num_done'];
    }
    return `${FeedSummaryStyle['order-stat__num']} ${extra}`;
  };

  return (
    <div className={FeedSummaryStyle['order-stat']}>
      <h3 className={FeedSummaryStyle['order-stat__label']}>
        {orderState[status][1] + ':'}
      </h3>
      <div className={FeedSummaryStyle['order-stat__box']}>
        {numList && numList.length > 0 ? (
          numList.map((num, ind) => (
            <p className={numClassNames()} key={ind}>
              {num}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
