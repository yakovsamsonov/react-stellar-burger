import { useContext, useEffect, useReducer, useState } from 'react';
import OrderStyle from './order.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal';
import {
  BOTTOM_ING_TYPE,
  BUN_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
  BACKEND_BASE_URL,
} from '../constants/constants.jsx';
import order_confirmed from '../../icons/order_confirmed.svg';
import { orderPropType, orderDetailsPropType } from '../../utils/prop-types.js';
import { OrderContext } from '../../utils/context';
import { placeOrder } from '../../utils/burger-api';

const orderInitialState = { items: [], total: 0 };

function orderReducer(state, action) {
  let newItems = state.items;

  const ingredient = action.ingredient;

  const itemCount = state.items.reduce((count, el) => {
    if (el.data._id === ingredient._id) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  switch (action.type) {
    case 'add':
      if (ingredient.type === BUN_TYPE) {
        newItems = addBunToOrder(newItems, ingredient);
      } else {
        newItems = addRegularToOrder(newItems, ingredient);
      }
      return {
        items: newItems,
        total: newItems.reduce((acc, el) => {
          return acc + el.count * el.data.price;
        }, 0),
      };
    case 'remove':
      if (itemCount === 1) {
        newItems = state.items.filter((el) => el.data._id !== ingredient._id);
      } else if (itemCount > 1) {
        newItems = state.items.map((el) => {
          if (el.data._id === ingredient._id) {
            return { data: el.data, type: el.type, count: el.count - 1 };
          } else return el;
        });
      }
      return {
        items: newItems,
        total: newItems.reduce((acc, el) => {
          return acc + el.count * el.data.price;
        }, 0),
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function orderHasBun(order) {
  return order.some((el) => el.data.type === BUN_TYPE);
}

function addBunToOrder(order, bun) {
  if (orderHasBun(order)) {
    order = removeAllBunsFromOrder(order);
  }
  order.push({ data: bun, type: TOP_ING_TYPE, count: 1 });
  order.push({ data: bun, type: BOTTOM_ING_TYPE, count: 1 });
  return order;
}

function removeAllBunsFromOrder(order) {
  return order.filter((el) => el.data.type !== BUN_TYPE);
}

function addRegularToOrder(order, ingredient) {
  const id = ingredient._id;
  if (order.some((el) => el.data._id === id)) {
    order = order.map((el) => {
      if (el.data._id === id) {
        return { data: el.data, type: el.type, count: el.count + 1 };
      } else return el;
    });
  } else
    order.push({
      data: ingredient,
      type: REGULAR_ING_TYPE,
      count: 1,
    });

  return order;
}

function Order() {
  const [order, orderChanger] = useReducer(orderReducer, orderInitialState);

  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    if (order.items.length > 0) {
      setVisible(true);
    }
  };

  const modal = <OrderDetails onClose={closeModal}></OrderDetails>;

  function getOrderedNum(id) {
    const el = order.items.find((el) => el.data._id === id);
    if (el) {
      return el.count;
    } else return 0;
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        orderChanger,
        getOrderedNum,
        openModal,
      }}
    >
      <div className={OrderStyle.order}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
      {visible && modal}
    </OrderContext.Provider>
  );
}

function OrderDetails(props) {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    orderNum: 0,
  });

  const { order } = useContext(OrderContext);

  useEffect(() => {
    sendOrder();
  }, []);

  const sendOrder = () => {
    setState({ ...state, hasError: false, isLoading: true });
    placeOrder(
      BACKEND_BASE_URL,
      order.items.map((el) => el.data._id)
    )
      .then((d) => {
        setState({ ...state, orderNum: d.order.number, isLoading: false });
      })
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={OrderStyle['order-confirmation']}>
        <h2 className={OrderStyle['order-confirmation__number']}>
          {!state.isLoading && !state.hasError && state.orderNum}
          {state.isLoading && !state.hasError && '...'}
          {state.hasError && 'УПС..'}
        </h2>
        <p className={OrderStyle['order-confirmation__number-label']}>
          идентификатор заказа
        </p>
        <img
          src={order_confirmed}
          alt=""
          className={OrderStyle['order-confirmation__status-image']}
        />
        <p className={OrderStyle['order-confirmation__instruction']}>
          Ваш заказ начали готовить
        </p>
        <p className={OrderStyle['order-confirmation__instruction_inactive']}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
}

Order.propTypes = orderPropType;
OrderDetails.propTypes = orderDetailsPropType;

export default Order;
