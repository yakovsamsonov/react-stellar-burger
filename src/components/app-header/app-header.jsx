import { useState } from "react";
import { BURGER, LIST, PROFILE } from "../constants/constants";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyle from "./app-header.module.css";
import HeaderItem from "../header-item/header-item";

function AppHeader(props) {
  const [selected, setSelected] = useState(BURGER);

  function handleClick(name) {
    setSelected(name);
  }

  function getItemType(item) {
    if (selected === item) {
      return "primary";
    }
    return "secondary";
  }

  return (
    <header className={HeaderStyle.header} onClick={props.click}>
      <div className={HeaderStyle.group}>
        <HeaderItem
          label="Конструктор"
          name={BURGER}
          selected={selected}
          onClick={handleClick}
        >
          <BurgerIcon type={getItemType(BURGER)} />
        </HeaderItem>
        <HeaderItem
          label="Лента заказов"
          selected={selected}
          name={LIST}
          onClick={handleClick}
        >
          <ListIcon type={getItemType(LIST)} />
        </HeaderItem>
      </div>
      <Logo />
      <HeaderItem
        label="Личный кабинет"
        selected={selected}
        name={PROFILE}
        onClick={handleClick}
      >
        <ProfileIcon type={getItemType(PROFILE)} />
      </HeaderItem>
    </header>
  );
}

export default AppHeader;
