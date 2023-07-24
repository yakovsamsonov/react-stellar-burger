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
      activeTab: "bread",
      data: data,
    };
  }

  changeTab = (value) => {
    this.setState({
      ...this.prevState,
      activeTab: value,
    });
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
            value="bread"
            active={this.state.activeTab === "bread"}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Булки</p>
          </Tab>
          <Tab
            value="souce"
            active={this.state.activeTab === "souce"}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Соусы</p>
          </Tab>
          <Tab
            value="extra"
            active={this.state.activeTab === "extra"}
            onClick={this.changeTab}
          >
            <p className="text text_type_main-default">Начинки</p>
          </Tab>
        </div>
        <div
          className={"custom-scroll"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "24px",
          }}
        >
          {this.state.data.map((card) => (
            <Card
              key={card._id}
              image={card.image}
              name={card.name}
              price={card.price}
            />
          ))}
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
    console.log(this.state.orderedNum);
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
      <article
        className={BurgerIngredientsStyle.card}
        onClick={this.processClick}
      >
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
      </article>
    );
  }
}

export default BurgerIngredients;
