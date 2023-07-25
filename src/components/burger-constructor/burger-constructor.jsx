import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./burger-constructor.module.css";
import {
  BOTTOM_ING_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from "../constants/constants";
import {
  burgerConstructorPropType,
  ingredientsGroupPropType,
} from "../../utils/prop-types.js";

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

class IngredientsGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupType: this.props.groupType,
    };
  }

  render() {
    const elCount = this.props.content.length;
    const baseClass = BurgerConstructorStyle.item__group;
    const extraClass =
      this.state.groupType === REGULAR_ING_TYPE ? "custom-scroll" : "";

    function getLabel(element) {
      let label = element.data.name;
      if (element.type === TOP_ING_TYPE) {
        label = label + " (верх)";
      } else if (element.type === BOTTOM_ING_TYPE) {
        label = label + " (низ)";
      }
      return label;
    }
    return (
      elCount !== 0 && (
        <ul
          className={baseClass.concat(" ", extraClass)}
          style={
            this.state.groupType === REGULAR_ING_TYPE
              ? { overflowY: "scroll", paddingRight: "4px" }
              : { paddingLeft: "32px", paddingRight: "16px" }
          }
        >
          {this.props.content.map((el) => (
            <li className={BurgerConstructorStyle.item} key={el.data._id}>
              {this.state.groupType === REGULAR_ING_TYPE && (
                <DragIcon type="primary" />
              )}
              <ConstructorElement
                type={this.state.groupType}
                isLocked={this.state.groupType !== REGULAR_ING_TYPE}
                text={getLabel(el)}
                price={el.data.price}
                thumbnail={el.data.image}
                handleClose={() => {
                  this.props.removeFromOrder(el.data._id);
                }}
              />
            </li>
          ))}
        </ul>
      )
    );
  }
}

BurgerConstructor.propTypes = burgerConstructorPropType;
IngredientsGroup.propTypes = ingredientsGroupPropType;

export default BurgerConstructor;
