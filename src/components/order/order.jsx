import { useState } from "react";
import OrderStyle from "./order.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal";
import {
  BOTTOM_ING_TYPE,
  BUN_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from "../constants/constants.jsx";
import order_confirmed from "../../icons/order_confirmed.svg";
import { orderPropType, orderDetailsPropType } from "../../utils/prop-types.js";

function Order(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const modal = <OrderDetails onClose={closeModal}></OrderDetails>;

  function updateItems(updatedItems) {
    const newTotal = updatedItems.reduce((acc, el) => {
      return acc + el.count * el.data.price;
    }, 0);
    setItems(updatedItems);
    setTotal(newTotal);
  }

  function addToOrder(id) {
    let updatedItems = items;
    const ingredient = props.data.find((el) => el._id === id);
    const ingredientType = ingredient.type;

    if (items.some((el) => el.data._id === id)) {
      updatedItems = items.map((el) => {
        if (el.data._id === id) {
          return { data: el.data, type: el.type, count: el.count + 1 };
        } else return el;
      });
    } else {
      if (ingredientType === BUN_TYPE) {
        updatedItems.push({ data: ingredient, type: TOP_ING_TYPE, count: 1 });
        updatedItems.push({
          data: ingredient,
          type: BOTTOM_ING_TYPE,
          count: 1,
        });
      } else {
        updatedItems.push({
          data: ingredient,
          type: REGULAR_ING_TYPE,
          count: 1,
        });
      }
    }

    updateItems(updatedItems);
  }

  function removeFromOrder(id) {
    let updatedItems = items;
    const el = items.find((el) => el.data._id === id);
    if (el.count <= 1) {
      updatedItems = items.filter((el) => el.data._id !== id);
    } else if (el.count > 1) {
      updatedItems = items.map((el) => {
        if (el.data._id === id) {
          return { data: el.data, type: el.type, count: el.count - 1 };
        } else return el;
      });
    }

    updateItems(updatedItems);
  }

  function getOrderedNum(id) {
    const el = items.find((el) => el.data._id === id);
    if (el) {
      return el.count;
    } else return 0;
  }

  return (
    <div className={OrderStyle.order}>
      <BurgerIngredients
        data={props.data}
        content={items}
        addToOrder={addToOrder}
        removeFromOrder={removeFromOrder}
        getOrderedNum={getOrderedNum}
      />
      <BurgerConstructor
        content={items}
        totalPrice={total}
        removeFromOrder={removeFromOrder}
        openOrderConfirmation={openModal}
      />
      {visible && modal}
    </div>
  );
}

function OrderDetails(props) {
  return (
    <Modal onClose={props.onClose}>
      <div className={OrderStyle["order-confirmation"]}>
        <h2 className={OrderStyle["order-confirmation__number"]}>034536</h2>
        <p className={OrderStyle["order-confirmation__number-label"]}>
          идентификатор заказа
        </p>
        <img
          src={order_confirmed}
          className={OrderStyle["order-confirmation__status-image"]}
        />
        <p className={OrderStyle["order-confirmation__instruction"]}>
          Ваш заказ начали готовить
        </p>
        <p className={OrderStyle["order-confirmation__instruction_inactive"]}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
}

Order.propTypes = orderPropType;
OrderDetails.propTypes = orderDetailsPropType;

export default Order;
