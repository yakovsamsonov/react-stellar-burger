import { useEffect } from 'react';
import FeedStyle from './feed.module.css';
import { useDispatch } from 'react-redux';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../../services/actions';

export function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <div className={FeedStyle['feed']}>
      <h2 className={FeedStyle['feed__label']}>Лента заказов</h2>
    </div>
  );
}
