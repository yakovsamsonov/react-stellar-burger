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

function BurgerConstructor(props) {
  function filterBurgerComponent(type) {
    return props.content.filter((el) => el.type === type);
  }

  return (
    <section className={BurgerConstructorStyle.section}>
      <IngredientsGroup
        groupType={TOP_ING_TYPE}
        content={filterBurgerComponent(TOP_ING_TYPE)}
      />
      <IngredientsGroup
        groupType={REGULAR_ING_TYPE}
        content={filterBurgerComponent(REGULAR_ING_TYPE)}
        removeFromOrder={props.removeFromOrder}
      />
      <IngredientsGroup
        groupType={BOTTOM_ING_TYPE}
        content={filterBurgerComponent(BOTTOM_ING_TYPE)}
      />
      <div className={BurgerConstructorStyle["summary"]}>
        <p className={BurgerConstructorStyle["summary__total-value"]}>
          {props.totalPrice}
        </p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={props.openOrderConfirmation}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = burgerConstructorPropType;

export default BurgerConstructor;
