import { useEffect, FC } from 'react';
import FeedStyle from './feed.module.css';
import { useAppDispatch } from '../../services/hooks';
import { FeedList } from '../../components/feed-list/feed-list';
import { FeedSummary } from '../../components/feed-summary/feed-summary';
import { wsStartConnection, wsCloseConnection } from '../../services/actions';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsStartConnection('/all'));

    return () => {
      dispatch(wsCloseConnection());
    };
  }, [dispatch]);

  return (
    <div className={FeedStyle['feed']}>
      <h2 className={FeedStyle['feed__label']}>Лента заказов</h2>
      <div className={FeedStyle['feed__box']}>
        <FeedList />
        <FeedSummary />
      </div>
    </div>
  );
};
