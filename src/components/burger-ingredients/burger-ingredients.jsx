import React from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import { data } from "../../utils/data.js";

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "bun",
      data: data,
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
    const filteredData = this.state.data.filter((el) => {
      return el.type === type;
    });
    return filteredData;
  };

  render() {
    return (
      <section
        style={{ display: "flex", flexDirection: "column" }}
        className={BurgerIngredientsStyle.section + " mr-10"}
      >
        <h2 className="mt-10 mb-4 text text_type_main-large">
          Соберите бургер
        </h2>
        <div className="mb-10" style={{ display: "flex" }}>
          <Tab
            value="bun"
            active={this.state.activeTab === "bun"}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Булки</p>
          </Tab>
          <Tab
            value="sauce"
            active={this.state.activeTab === "sauce"}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Соусы</p>
          </Tab>
          <Tab
            value="main"
            active={this.state.activeTab === "main"}
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
          <Section id="bun" label="Булки" data={this.filterData("bun")} />
          <Section id="sauce" label="Соусы" data={this.filterData("sauce")} />
          <Section id="main" label="Начинки" data={this.filterData("main")} />
        </div>
      </section>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      label: props.name,
      price: props.price,
      orderedNum: 0,
    };
  }

  processClick = () => {
    if (this.state.orderedNum === 0) {
      this.setState({
        ...this.prevState,
        orderedNum: this.state.orderedNum + 1,
      });
    } else {
      this.setState({
        ...this.prevState,
        orderedNum: 0,
      });
    }
  };

  render() {
    return (
      <li className={BurgerIngredientsStyle.card} onClick={this.processClick}>
        {this.state.orderedNum > 0 && (
          <Counter count={this.state.orderedNum} size="default" />
        )}

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
              image={card.image}
              name={card.name}
              price={card.price}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default BurgerIngredients;
