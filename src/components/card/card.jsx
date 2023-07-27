import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { cardPropType } from "../../utils/prop-types.js";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      image: props.image,
      label: props.name,
      price: props.price,
    };
  }

  processClick = () => {
    if (this.props.getOrderedNum(this.state.id) === 0) {
      this.props.addToOrder(this.state.id);
    } else {
      this.props.removeFromOrder(this.state.id);
    }
  };

  render() {
    const orderedNum = this.props.getOrderedNum(this.state.id);
    return (
      <li className={CardStyle.card} onClick={this.processClick}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}

        <img src={this.state.image} alt={this.state.label} />
        <div className={CardStyle.price__box}>
          <p className={CardStyle.price + " text text_type_digits-default"}>
            {this.state.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={CardStyle.label + " text text_type_main-default"}>
          {this.state.label}
        </p>
      </li>
    );
  }
}

Card.propTypes = cardPropType;

export default Card;
