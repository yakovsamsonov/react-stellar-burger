import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { cardPropType, cardDetailsPropType } from "../../utils/prop-types.js";
import Modal from "../modal/modal";

function Card(props) {
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  function processClick() {
    setVisible(true);
  }

  function addToOrder() {
    if (props.getOrderedNum(props.card._id) === 0) {
      props.addToOrder(props.card._id);
    } else {
      props.removeFromOrder(props.card._id);
    }
  }

  const modal = (
    <CardDetails
      card={props.card}
      addToOrder={addToOrder}
      onClose={closeModal}
    ></CardDetails>
  );

  const orderedNum = props.getOrderedNum(props.card._id);
  return (
    <>
      <li className={CardStyle.card} onClick={processClick}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}

        <img src={props.card.image} alt={props.card.name} />
        <div className={CardStyle.price__box}>
          <p className={CardStyle.price + " text text_type_digits-default"}>
            {props.card.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={CardStyle.label + " text text_type_main-default"}>
          {props.card.name}
        </p>
      </li>
      {visible && modal}
    </>
  );
}

function CardDetails(props) {
  return (
    <Modal onClose={props.onClose} header="Детали ингридиента">
      <div className={CardStyle["card-details-box"]}>
        <img
          className={CardStyle["card-details-image"] + " mb-4"}
          src={props.card.image}
          alt={props.card.name}
          onClick={props.addToOrder}
        />
        <p className={CardStyle.label + " text text_type_main-default"}>
          {props.card.name}
        </p>
        <ul className={CardStyle["nutrition-box"]}>
          <li className={CardStyle["nutrition-item"]}>
            <p
              className={
                CardStyle["nutrition-item-label"] +
                " text text_type_main-small text_color_inactive"
              }
            >
              Калории, ккал
            </p>
            <p
              className={
                CardStyle["nutrition-item-value"] +
                " text text_type_digits-default text_color_inactive"
              }
            >
              {props.card.calories}
            </p>
          </li>
          <li className={CardStyle["nutrition-item"]}>
            <p
              className={
                CardStyle["nutrition-item-label"] +
                " text text_type_main-small text_color_inactive"
              }
            >
              Белки, г
            </p>
            <p
              className={
                CardStyle["nutrition-item-value"] +
                " text text_type_digits-default text_color_inactive"
              }
            >
              {props.card.proteins}
            </p>
          </li>
          <li className={CardStyle["nutrition-item"]}>
            <p
              className={
                CardStyle["nutrition-item-label"] +
                " text text_type_main-small text_color_inactive"
              }
            >
              Жиры, г
            </p>
            <p
              className={
                CardStyle["nutrition-item-value"] +
                " text text_type_digits-default text_color_inactive"
              }
            >
              {props.card.fat}
            </p>
          </li>
          <li className={CardStyle["nutrition-item"]}>
            <p
              className={
                CardStyle["nutrition-item-label"] +
                " text text_type_main-small text_color_inactive"
              }
            >
              Углеводы, г
            </p>
            <p
              className={
                CardStyle["nutrition-item-value"] +
                " text text_type_digits-default text_color_inactive"
              }
            >
              {props.card.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </Modal>
  );
}

Card.propTypes = cardPropType;
CardDetails.propTypes = cardDetailsPropType;

export default Card;
