import HeaderItemStyle from "./header-item.module.css";
import { headerItemPropType } from "../../utils/prop-types.js";

function HeaderItem(props) {
  function addInactiveClass() {
    if (props.selected !== props.name) {
      return " text_color_inactive";
    }
    return "";
  }

  const labelClass = `${HeaderItemStyle.label}${addInactiveClass()}`;

  return (
    <a
      href="#"
      className={HeaderItemStyle.item}
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
