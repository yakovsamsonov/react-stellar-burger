import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyle from "./app-header.module.css";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "burger",
    };
  }

  onClick = (name) => {
    console.log(name);
    this.setState({ selected: name });
  };

  getItemType(item) {
    if (this.state.selected === item) {
      return "primary";
    }
    return "secondary";
  }

  render() {
    return (
      <header className={HeaderStyle.header}>
        <div className={HeaderStyle.group}>
          <HeaderItem
            label="Конструктор"
            name="burger"
            selected={this.state.selected}
            onClick={this.onClick}
          >
            <BurgerIcon type={this.getItemType("burger")} />
          </HeaderItem>
          <HeaderItem
            label="Лента заказов"
            selected={this.state.selected}
            name="list"
            onClick={this.onClick}
          >
            <ListIcon type={this.getItemType("list")} />
          </HeaderItem>
        </div>
        <Logo />
        <HeaderItem
          label="Личный кабинет"
          selected={this.state.selected}
          name="profile"
          onClick={this.onClick}
        >
          <ProfileIcon type={this.getItemType("profile")} />
        </HeaderItem>
      </header>
    );
  }
}

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
    const boxClass = `${HeaderStyle.item}` + " pt-4 pb-4 pr-5 pl-5 mt-4 mb-4";
    const labelClass =
      `${HeaderStyle.label}` +
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

export default AppHeader;
