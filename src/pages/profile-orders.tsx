import { useDispatch } from 'react-redux';
import { useEffect, FC } from 'react';
import { FeedList } from '../components/feed-list/feed-list';
import { getAccessToken } from '../utils';
import { wsStartConnection, wsCloseConnection } from '../services/actions';

export const ProfileOrders: FC = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(wsStartConnection(`?token=${getAccessToken()}`));

    return () => {
      dispatch(wsCloseConnection());
    };
  }, [dispatch]);

  return <FeedList showStatus />;
};
