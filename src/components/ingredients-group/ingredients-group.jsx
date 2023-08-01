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

function IngredientsGroup(props) {
  const { groupType, content } = props;
  const elCount = content.length;
  const baseClass = IngredientsGroupStyle.item__group;
  const extraClass = groupType === REGULAR_ING_TYPE ? "custom-scroll" : "";

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
          groupType === REGULAR_ING_TYPE
            ? { overflowY: "scroll", paddingRight: "4px" }
            : { paddingLeft: "32px", paddingRight: "16px" }
        }
      >
        {content.map((el) => (
          <li className={IngredientsGroupStyle.item} key={el.data._id}>
            {groupType === REGULAR_ING_TYPE && <DragIcon type="primary" />}
            <ConstructorElement
              type={groupType}
              isLocked={groupType !== REGULAR_ING_TYPE}
              text={getLabel(el)}
              price={el.data.price}
              thumbnail={el.data.image}
              handleClose={() => {
                props.removeFromOrder(el.data._id);
              }}
            />
          </li>
        ))}
      </ul>
    )
  );
}

IngredientsGroup.propTypes = ingredientsGroupPropType;

export default IngredientsGroup;
