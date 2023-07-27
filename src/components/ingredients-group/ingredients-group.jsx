import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsGroupStyle from "./ingredients-group.module.css";
import {
  BOTTOM_ING_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from "../constants/constants";
import { ingredientsGroupPropType } from "../../utils/prop-types.js";

class IngredientsGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupType: this.props.groupType,
    };
  }

  render() {
    const elCount = this.props.content.length;
    const baseClass = IngredientsGroupStyle.item__group;
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
            <li className={IngredientsGroupStyle.item} key={el.data._id}>
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

IngredientsGroup.propTypes = ingredientsGroupPropType;

export default IngredientsGroup;
