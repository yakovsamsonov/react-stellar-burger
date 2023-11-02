import { useSelector } from 'react-redux';
import { useMemo, FC } from 'react';
import FeedSummaryStyle from './feed-summary.module.css';
import {
  OrderStatePlural,
  OrderStateSingle,
  TOrdersHistory,
} from '../../utils';
import { orderHistory } from '../../services/selectors/selectors';

type TStat = {
  label: string;
  value: number;
};

type TOrderNumBox = {
  status: OrderStatePlural;
  numList: Array<string>;
};

export const FeedSummary: FC = () => {
  const { orders, total, totalToday } = useSelector<any, TOrdersHistory>(
    orderHistory
  );

  const getNumbersByStatus = (
    status: keyof typeof OrderStateSingle
  ): Array<string> => {
    return orders.filter((el) => el.status === status).map((el) => el.number);
  };

  return (
    <section className={FeedSummaryStyle['feed-summary']}>
      <div className={FeedSummaryStyle['feed-summary__orders-box']}>
        <OrderNumBox
          status={OrderStatePlural.done}
          numList={getNumbersByStatus('done')}
        ></OrderNumBox>
        <OrderNumBox
          status={OrderStatePlural.pending}
          numList={getNumbersByStatus('pending')}
        ></OrderNumBox>
      </div>
      <>
        <Stat label={'Выполнено за все время'} value={total}></Stat>
        <Stat label={'Выполнено за сегодня'} value={totalToday}></Stat>
      </>
    </section>
  );
};

const Stat: FC<TStat> = ({ label, value }) => {
  return (
    <div>
      <h3 className={FeedSummaryStyle['stat__label']}>{label}:</h3>
      <p className={FeedSummaryStyle['stat__value']}>{value}</p>
    </div>
  );
};

const OrderNumBox: FC<TOrderNumBox> = ({ status, numList }) => {
  const numClassNames: string = useMemo((): string => {
    let extra = '';
    if (status === OrderStatePlural.done) {
      extra = FeedSummaryStyle['order-stat__num_done'];
    }
    return `${FeedSummaryStyle['order-stat__num']} ${extra}`;
  }, [status]);

  return (
    <div className={FeedSummaryStyle['order-stat']}>
      <h3 className={FeedSummaryStyle['order-stat__label']}>{status + ':'}</h3>
      <div className={FeedSummaryStyle['order-stat__box']}>
        {numList && numList.length > 0 ? (
          numList.map((num, ind) => (
            <p className={numClassNames} key={ind}>
              {num}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
