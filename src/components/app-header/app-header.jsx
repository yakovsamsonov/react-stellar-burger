import { BURGER, LIST, PROFILE } from '../../utils/constants';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyle from './app-header.module.css';
import HeaderItem from '../header-item/header-item';
import { useSelector } from 'react-redux';

function AppHeader() {
  const { name } = useSelector((store) => store.selectedTab);

  function getItemType(item) {
    if (name === item) {
      return 'primary';
    }
    return 'secondary';
  }

  return (
    <header className={HeaderStyle.header}>
      <div className={HeaderStyle.group}>
        <HeaderItem label="Конструктор" name={BURGER}>
          <BurgerIcon type={getItemType(BURGER)} />
        </HeaderItem>
        <HeaderItem label="Лента заказов" name={LIST}>
          <ListIcon type={getItemType(LIST)} />
        </HeaderItem>
      </div>
      <Logo />
      <HeaderItem label="Личный кабинет" name={PROFILE}>
        <ProfileIcon type={getItemType(PROFILE)} />
      </HeaderItem>
    </header>
  );
}

export default AppHeader;
