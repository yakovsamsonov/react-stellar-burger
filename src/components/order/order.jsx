import React from "react";
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

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      items: [],
      total: 0,
    };
  }

  updateItems = (updatedItems) => {
    this.setState((prevState) => {
      const newTotal = updatedItems.reduce((acc, el) => {
        return acc + el.count * el.data.price;
      }, 0);
      return {
        ...prevState,
        items: updatedItems,
        total: newTotal,
      };
    });
  };

  addToOrder = (id) => {
    let updatedItems = this.state.items;

    const ingredient = this.state.data.find((el) => el._id === id);
    const ingredientType = ingredient.type;

    if (this.state.items.some((el) => el.data._id === id)) {
      updatedItems = this.state.items.map((el) => {
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

    this.updateItems(updatedItems);
  };

  removeFromOrder = (id) => {
    let updatedItems = this.state.items;
    const el = this.state.items.find((el) => el.data._id === id);
    if (el.count <= 1) {
      updatedItems = this.state.items.filter((el) => el.data._id !== id);
    } else if (el.count > 1) {
      updatedItems = this.state.items.map((el) => {
        if (el.data._id === id) {
          return { data: el.data, type: el.type, count: el.count - 1 };
        } else return el;
      });
    }

    this.updateItems(updatedItems);
  };

  getOrderedNum = (id) => {
    const el = this.state.items.find((el) => el.data._id === id);
    if (el) {
      return el.count;
    } else return 0;
  };

  render() {
    return (
      <div className={OrderStyle.order}>
        <BurgerIngredients
          data={this.state.data}
          content={this.state.items}
          addToOrder={this.addToOrder}
          removeFromOrder={this.removeFromOrder}
          getOrderedNum={this.getOrderedNum}
        />
        <BurgerConstructor
          content={this.state.items}
          totalPrice={this.state.total}
          removeFromOrder={this.removeFromOrder}
        />
      </div>
    );
  }
}

Order.propTyps = orderPropType;

export default Order;
