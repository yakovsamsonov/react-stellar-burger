import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Section from "../section/section";
import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE } from "../constants/constants.jsx";
import { burgerIngredientPropType } from "../../utils/prop-types.js";

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: BUN_TYPE,
      data: props.data,
    };
  }

  changeTab = (value) => {
    this.setState({
      ...this.prevState,
      activeTab: value,
    });

    const targetBlock = document.getElementById(value);
    if (targetBlock) {
      targetBlock.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  filterData = (type) => {
    return this.state.data.filter((el) => el.type === type);
  };

  render() {
    return (
      <section className={BurgerIngredientsStyle.section + " pt-10 mr-10"}>
        <h2 className="mb-4 text text_type_main-large">Соберите бургер</h2>
        <div className="mb-10" style={{ display: "flex" }}>
          <Tab
            value={BUN_TYPE}
            active={this.state.activeTab === BUN_TYPE}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Булки</p>
          </Tab>
          <Tab
            value={SAUCE_TYPE}
            active={this.state.activeTab === SAUCE_TYPE}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Соусы</p>
          </Tab>
          <Tab
            value={MAIN_TYPE}
            active={this.state.activeTab === MAIN_TYPE}
            onClick={this.changeTab}
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
            data={this.filterData(BUN_TYPE)}
            addToOrder={this.props.addToOrder}
            removeFromOrder={this.props.removeFromOrder}
            getOrderedNum={this.props.getOrderedNum}
          />
          <Section
            id={SAUCE_TYPE}
            label="Соусы"
            data={this.filterData(SAUCE_TYPE)}
            addToOrder={this.props.addToOrder}
            removeFromOrder={this.props.removeFromOrder}
            getOrderedNum={this.props.getOrderedNum}
          />
          <Section
            id={MAIN_TYPE}
            label="Начинки"
            data={this.filterData(MAIN_TYPE)}
            addToOrder={this.props.addToOrder}
            removeFromOrder={this.props.removeFromOrder}
            getOrderedNum={this.props.getOrderedNum}
          />
        </div>
      </section>
    );
  }
}

BurgerIngredients.propTypes = burgerIngredientPropType;

export default BurgerIngredients;
