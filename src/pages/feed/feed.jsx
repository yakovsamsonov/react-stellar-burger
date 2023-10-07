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

  return <h2 className={FeedStyle['section__label']}>Соберите бургер</h2>;
}
