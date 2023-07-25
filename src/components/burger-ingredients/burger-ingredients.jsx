import React from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE } from "../constants/constants.jsx";

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
      <li className={BurgerIngredientsStyle.card} onClick={this.processClick}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}

        <img src={this.state.image} alt={this.state.label} />
        <div className={BurgerIngredientsStyle.price__box}>
          <p
            className={
              BurgerIngredientsStyle.price + " text text_type_digits-default"
            }
          >
            {this.state.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={
            BurgerIngredientsStyle.label + " text text_type_main-default"
          }
        >
          {this.state.label}
        </p>
      </li>
    );
  }
}

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
        <ul
          className={
            BurgerIngredientsStyle.card__group + " pl-4 pr-4 pt-6 pb-10"
          }
        >
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

export default BurgerIngredients;
