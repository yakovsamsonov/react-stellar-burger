import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./burger-constructor.module.css";

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section style={{ display: "flex", flexDirection: "column" }}>
        {this.props.content.map((el) => (
          <ConstructorElement
            key={el.data._id}
            type="top"
            isLocked={true}
            text={el.data.name}
            price={el.data.price}
            thumbnail={el.data.image}
          />
        ))}
        <p>Итого {this.props.totalPrice}</p>
      </section>
    );
  }
}

export default BurgerConstructor;
