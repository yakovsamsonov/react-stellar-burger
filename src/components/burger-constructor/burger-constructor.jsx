import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import BurgerConstructorStyle from "./burger-constructor.module.css";
import {
  BOTTOM_ING_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from "../constants/constants";
import { burgerConstructorPropType } from "../../utils/prop-types.js";

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
  }

  filterBurgerComponent = (type) => {
    return this.props.content.filter((el) => el.type === type);
  };

  render() {
    return (
      <section
        className={BurgerConstructorStyle.section + " pt-25 pl-4"}
        style={{ justifyContent: "flex-end" }}
      >
        <IngredientsGroup
          groupType={TOP_ING_TYPE}
          content={this.filterBurgerComponent(TOP_ING_TYPE)}
        />
        <IngredientsGroup
          groupType={REGULAR_ING_TYPE}
          content={this.filterBurgerComponent(REGULAR_ING_TYPE)}
          removeFromOrder={this.props.removeFromOrder}
        />
        <IngredientsGroup
          groupType={BOTTOM_ING_TYPE}
          content={this.filterBurgerComponent(BOTTOM_ING_TYPE)}
        />
        <div
          className="mt-10 pr-4"
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

BurgerConstructor.propTypes = burgerConstructorPropType;

export default BurgerConstructor;
