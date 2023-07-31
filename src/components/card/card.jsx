import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { cardPropType } from "../../utils/prop-types.js";

function Card(props) {
  const [state, setState] = useState({
    id: props.id,
    image: props.image,
    label: props.name,
    price: props.price,
  });

  function processClick() {
    if (props.getOrderedNum(state.id) === 0) {
      props.addToOrder(state.id);
    } else {
      props.removeFromOrder(state.id);
    }
  }

  const orderedNum = props.getOrderedNum(state.id);
  return (
    <li className={CardStyle.card} onClick={processClick}>
      {orderedNum > 0 && <Counter count={orderedNum} size="default" />}

      <img src={state.image} alt={state.label} />
      <div className={CardStyle.price__box}>
        <p className={CardStyle.price + " text text_type_digits-default"}>
          {state.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={CardStyle.label + " text text_type_main-default"}>
        {state.label}
      </p>
    </li>
  );
}

Card.propTypes = cardPropType;

export default Card;
