import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions';

export function ProfileOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, private: true });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return <p>Здесь появится лента заказов</p>;
}
