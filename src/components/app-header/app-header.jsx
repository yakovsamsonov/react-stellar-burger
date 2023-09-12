import { BURGER, LIST, PROFILE } from '../../utils/constants';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyle from './app-header.module.css';
import HeaderItem from '../header-item/header-item';
import { useLocation } from 'react-router-dom';

function AppHeader() {
  const location = useLocation();

  function getItemType(path) {
    if (location.pathname === path) {
      return 'primary';
    }
    return 'secondary';
  }

  return (
    <header className={HeaderStyle.header}>
      <div className={HeaderStyle.group}>
        <HeaderItem to="/" label="Конструктор" name={BURGER}>
          <BurgerIcon type={getItemType('/')} />
        </HeaderItem>
        <HeaderItem to="/feed" label="Лента заказов" name={LIST}>
          <ListIcon type={getItemType('/feed')} />
        </HeaderItem>
      </div>
      <Logo />
      <HeaderItem to="/profile" label="Личный кабинет" name={PROFILE}>
        <ProfileIcon type={getItemType('/profile')} />
      </HeaderItem>
    </header>
  );
}

export default AppHeader;
