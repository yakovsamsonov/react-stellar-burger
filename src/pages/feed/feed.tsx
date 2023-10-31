import { useEffect, FC } from 'react';
import FeedStyle from './feed.module.css';
import { useDispatch } from 'react-redux';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../../services/actions';
import { FeedList } from '../../components/feed-list/feed-list';
import { FeedSummary } from '../../components/feed-summary/feed-summary';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={FeedStyle['feed']}>
      <h2 className={FeedStyle['feed__label']}>Лента заказов</h2>
      <div className={FeedStyle['feed__box']}>
        <FeedList showStatus={false} />
        <FeedSummary />
      </div>
    </div>
  );
};
