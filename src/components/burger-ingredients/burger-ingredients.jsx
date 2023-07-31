import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Section from "../section/section";
import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE } from "../constants/constants.jsx";
import { burgerIngredientPropType } from "../../utils/prop-types.js";

function BurgerIngredients(props) {
  const [activeTab, setActiveTab] = useState(BUN_TYPE);

  function changeTab(value) {
    setActiveTab(value);
    const targetBlock = document.getElementById(value);
    if (targetBlock) {
      targetBlock.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  function filterData(type) {
    return props.data.filter((el) => el.type === type);
  }

  return (
    <section className={BurgerIngredientsStyle.section + " pt-10 mr-10"}>
      <h2 className="mb-4 text text_type_main-large">Соберите бургер</h2>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab
          value={BUN_TYPE}
          active={activeTab === BUN_TYPE}
          onClick={changeTab}
        >
          <p className="text text_type_main-default">Булки</p>
        </Tab>
        <Tab
          value={SAUCE_TYPE}
          active={activeTab === SAUCE_TYPE}
          onClick={changeTab}
        >
          <p className="text text_type_main-default">Соусы</p>
        </Tab>
        <Tab
          value={MAIN_TYPE}
          active={activeTab === MAIN_TYPE}
          onClick={changeTab}
        >
          <p className="text text_type_main-default">Начинки</p>
        </Tab>
      </div>
      <div
        className="custom-scroll"
        style={{
          overflowY: "scroll",
        }}
      >
        <Section
          id={BUN_TYPE}
          label="Булки"
          data={filterData(BUN_TYPE)}
          addToOrder={props.addToOrder}
          removeFromOrder={props.removeFromOrder}
          getOrderedNum={props.getOrderedNum}
        />
        <Section
          id={SAUCE_TYPE}
          label="Соусы"
          data={filterData(SAUCE_TYPE)}
          addToOrder={props.addToOrder}
          removeFromOrder={props.removeFromOrder}
          getOrderedNum={props.getOrderedNum}
        />
        <Section
          id={MAIN_TYPE}
          label="Начинки"
          data={filterData(MAIN_TYPE)}
          addToOrder={props.addToOrder}
          removeFromOrder={props.removeFromOrder}
          getOrderedNum={props.getOrderedNum}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = burgerIngredientPropType;

export default BurgerIngredients;
