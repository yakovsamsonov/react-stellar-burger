import { useDispatch } from 'react-redux';
import OrderConfirmationStyle from './order-confirmation.module.css';
import order_confirmed from '../../icons/order_confirmed.svg';
import Modal from '../modal/modal';
import { CLOSE_ORDER } from '../../services/actions/order';
import { useCallback, FC } from 'react';

type TOrderConfirmation = {
  orderNumber: number;
};

export const OrderConfirmation: FC<TOrderConfirmation> = ({ orderNumber }) => {
  const dispatch = useDispatch();

  const processOrderDetailsClose = useCallback((): void => {
    dispatch({ type: CLOSE_ORDER });
  }, [dispatch]);

  return (
    <Modal onClose={processOrderDetailsClose}>
      <div className={OrderConfirmationStyle['order-confirmation']}>
        <h2 className={OrderConfirmationStyle['order-confirmation__number']}>
          {orderNumber}
        </h2>
        <p
          className={OrderConfirmationStyle['order-confirmation__number-label']}
        >
          идентификатор заказа
        </p>
        <img
          src={order_confirmed}
          alt=""
          className={OrderConfirmationStyle['order-confirmation__status-image']}
        />
        <p
          className={OrderConfirmationStyle['order-confirmation__instruction']}
        >
          Ваш заказ начали готовить
        </p>
        <p
          className={
            OrderConfirmationStyle['order-confirmation__instruction_inactive']
          }
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};
