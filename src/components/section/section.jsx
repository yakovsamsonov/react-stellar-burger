import React from "react";
import Card from "../card/card";
import SectionStyle from "./section.module.css";
import { sectionPropType } from "../../utils/prop-types.js";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      data: props.data,
      id: props.id,
    };
  }

  render() {
    return (
      <div>
        <h3 className="text text_type_main-medium" id={this.state.id}>
          {this.state.label}
        </h3>
        <ul className={SectionStyle.card__group + " pl-4 pr-4 pt-6 pb-10"}>
          {this.state.data.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              image={card.image}
              name={card.name}
              price={card.price}
              addToOrder={this.props.addToOrder}
              removeFromOrder={this.props.removeFromOrder}
              getOrderedNum={this.props.getOrderedNum}
            />
          ))}
        </ul>
      </div>
    );
  }
}

Section.propTypes = sectionPropType;

export default Section;
