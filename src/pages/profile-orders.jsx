import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions';
import { FeedList } from '../components/feed-list/feed-list';
import { getAccessToken } from '../utils';

export function ProfileOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `?token=${getAccessToken()}`,
    });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return <FeedList status={true} />;
}
