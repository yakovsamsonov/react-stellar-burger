import React from "react";
import OrderStyle from "./order.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

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

    const el = this.state.data.find((el) => el._id === id);
    if (this.state.items.some((el) => el.data._id === id)) {
      updatedItems = this.state.items.map((el) => {
        if (el.data._id === id) {
          return { data: el.data, count: el.count + 1 };
        } else return el;
      });
    } else {
      updatedItems.push({ data: el, count: 1 });
    }

    this.updateItems(updatedItems);
  };

  removeFromOrder = (id) => {
    let updatedItems = [];
    const el = this.state.items.find((el) => el.data._id === id);
    if (el.count <= 1) {
      updatedItems = this.state.items.filter((el) => el.data._id !== id);
    } else if (el.count > 1) {
      updatedItems = this.state.items.map((el) => {
        if (el.data._id === id) {
          return { data: el.data, count: el.count - 1 };
        } else return el;
      });
    }

    this.updateItems(updatedItems);
  };

  render() {
    return (
      <div className={OrderStyle.order}>
        <BurgerIngredients
          data={this.state.data}
          addToOrder={this.addToOrder}
          removeFromOrder={this.removeFromOrder}
        />
        <BurgerConstructor
          content={this.state.items}
          totalPrice={this.state.total}
        />
      </div>
    );
  }
}

export default Order;
