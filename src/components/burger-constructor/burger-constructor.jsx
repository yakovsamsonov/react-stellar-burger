import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./burger-constructor.module.css";

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section
        className={BurgerConstructorStyle.section + " pt-25 pr-4 pl-4 pb-13"}
        style={{ justifyContent: "flex-end" }}
      >
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
        <div
          className="mt-10"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <p className="text text_type_digits-medium mr-2">
            {this.props.totalPrice}
          </p>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10"
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;
