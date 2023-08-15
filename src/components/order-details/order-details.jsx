import { useContext } from 'react';
import OrderDetailsStyle from './order-details.module.css';
import Modal from '../modal/modal';
import order_confirmed from '../../icons/order_confirmed.svg';
import { orderDetailsPropType } from '../../utils/prop-types.js';
import { OrderContext } from '../../utils/context';

export default function OrderDetails(props) {
  const { order } = useContext(OrderContext);

  return (
    <Modal onClose={props.onClose}>
      <div className={OrderDetailsStyle['order-confirmation']}>
        <h2 className={OrderDetailsStyle['order-confirmation__number']}>
          {order.orderNum}
        </h2>
        <p className={OrderDetailsStyle['order-confirmation__number-label']}>
          идентификатор заказа
        </p>
        <img
          src={order_confirmed}
          alt=""
          className={OrderDetailsStyle['order-confirmation__status-image']}
        />
        <p className={OrderDetailsStyle['order-confirmation__instruction']}>
          Ваш заказ начали готовить
        </p>
        <p
          className={
            OrderDetailsStyle['order-confirmation__instruction_inactive']
          }
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
}

OrderDetails.propTypes = orderDetailsPropType;
