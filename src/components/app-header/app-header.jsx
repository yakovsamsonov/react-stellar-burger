import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyle from "./app-header.module.css";
import HeaderItem from "../header-item/header-item";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "burger",
    };
  }

  onClick = (name) => {
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
      <header className={HeaderStyle.header} onClick={this.props.click}>
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

export default AppHeader;
