import { useState } from "react";
import OrderStyle from "./order.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import {
  BOTTOM_ING_TYPE,
  BUN_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from "../constants/constants.jsx";
import { orderPropType } from "../../utils/prop-types.js";

function Order(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

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
      />
    </div>
  );
}

Order.propTyps = orderPropType;

export default Order;
