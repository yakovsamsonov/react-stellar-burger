import { useReducer, useState } from 'react';
import OrderStyle from './order.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import {
  BOTTOM_ING_TYPE,
  BUN_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
  BACKEND_BASE_URL,
} from '../constants/constants.jsx';

import { OrderContext } from '../../utils/context';
import { placeOrder } from '../../utils/burger-api';

const orderInitialState = {
  items: [],
  total: 0,
  orderNum: 0,
  numberLoading: false,
  numberError: false,
};

function orderReducer(state, action) {
  let newItems = state.items;

  const ingredient = action.ingredient;

  switch (action.type) {
    case 'add':
      if (ingredient.type === BUN_TYPE) {
        newItems = addBunToOrder(newItems, ingredient);
      } else {
        newItems = addRegularToOrder(newItems, ingredient);
      }
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((acc, el) => {
          return acc + el.count * el.data.price;
        }, 0),
      };
    case 'remove':
      const itemCount = state.items.reduce((count, el) => {
        if (el.data._id === ingredient._id) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);

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
        ...state,
        items: newItems,
        total: newItems.reduce((acc, el) => {
          return acc + el.count * el.data.price;
        }, 0),
      };
    case 'place_order_send':
      return {
        ...state,
        numberLoading: true,
      };
    case 'place_order_success':
      return {
        ...state,
        orderNum: action.num,
        numberLoading: false,
      };
    case 'place_order_failed':
      return {
        ...state,
        orderNum: orderInitialState.orderNum,
        numberLoading: false,
        numberError: true,
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

export default function Order() {
  const [order, orderChanger] = useReducer(orderReducer, orderInitialState);

  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const sendOrder = () => {
    orderChanger({
      type: 'place_order_send',
    });
    return placeOrder(
      BACKEND_BASE_URL,
      order.items.map((el) => el.data._id)
    )
      .then((data) => {
        orderChanger({
          type: 'place_order_success',
          num: data.order.number,
        });
      })
      .catch((e) => {
        orderChanger({
          type: 'place_order_failed',
        });
      });
  };

  const openModal = () => {
    if (order.items.length > 0) {
      return sendOrder();
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
        setVisible,
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
