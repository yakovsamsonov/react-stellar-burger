import Card from "../card/card";
import SectionStyle from "./section.module.css";
import { sectionPropType } from "../../utils/prop-types.js";

function Section(props) {
  const { label, data, id } = props;

  return (
    <div>
      <h3 className="text text_type_main-medium" id={id}>
        {label}
      </h3>
      <ul className={SectionStyle.card__group + " pl-4 pr-4 pt-6 pb-10"}>
        {data.map((card) => (
          <Card
            key={card._id}
            card={card}
            addToOrder={props.addToOrder}
            removeFromOrder={props.removeFromOrder}
            getOrderedNum={props.getOrderedNum}
          />
        ))}
      </ul>
    </div>
  );
}

Section.propTypes = sectionPropType;

export default Section;
