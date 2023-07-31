import HeaderItemStyle from "./header-item.module.css";
import { headerItemPropType } from "../../utils/prop-types.js";

function HeaderItem(props) {
  function addInactiveClass() {
    if (props.selected !== props.name) {
      return " text_color_inactive";
    }
    return "";
  }

  const boxClass = `${HeaderItemStyle.item}` + " pt-4 pb-4 pr-5 pl-5 mt-4 mb-4";
  const labelClass =
    `${HeaderItemStyle.label}` +
    " text text_type_main-default" +
    `${addInactiveClass()}`;

  return (
    <a
      href="#"
      className={boxClass}
      onClick={(e) => {
        props.onClick(props.name);
      }}
    >
      {props.children}
      <p className={labelClass}>{props.label}</p>
    </a>
  );
}

HeaderItem.propTypes = headerItemPropType;

export default HeaderItem;
