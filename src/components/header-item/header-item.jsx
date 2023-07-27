import React from "react";
import HeaderItemStyle from "./header-item.module.css";
import { headerItemPropType } from "../../utils/prop-types.js";

class HeaderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  addInactiveClass() {
    if (this.props.selected !== this.props.name) {
      return " text_color_inactive";
    }
    return "";
  }

  render() {
    const boxClass =
      `${HeaderItemStyle.item}` + " pt-4 pb-4 pr-5 pl-5 mt-4 mb-4";
    const labelClass =
      `${HeaderItemStyle.label}` +
      " text text_type_main-default" +
      `${this.addInactiveClass()}`;
    return (
      <a
        href="#"
        className={boxClass}
        onClick={(e) => {
          this.props.onClick(this.props.name);
        }}
      >
        {this.props.children}
        <p className={labelClass}>{this.props.label}</p>
      </a>
    );
  }
}

HeaderItem.propTypes = headerItemPropType;

export default HeaderItem;
