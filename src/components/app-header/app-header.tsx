import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyle from './app-header.module.css';
import { HeaderItem } from '../header-item/header-item';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { NavigationLabel } from '../../utils';

function AppHeader() {
  const { pathname } = useLocation();

  function getItemType(path: string): TIconProps['type'] {
    if (
      (path !== '/' && pathname.includes(path)) ||
      (path === '/' && pathname === path)
    ) {
      return 'primary';
    }
    return 'secondary';
  }

  return (
    <header className={HeaderStyle.header}>
      <div className={HeaderStyle.group}>
        <HeaderItem to="/" label={NavigationLabel.burger}>
          <BurgerIcon type={getItemType('/')} />
        </HeaderItem>
        <HeaderItem to="/feed" label={NavigationLabel.list}>
          <ListIcon type={getItemType('/feed')} />
        </HeaderItem>
      </div>
      <Link to="/">
        <Logo />
      </Link>
      <HeaderItem to="/profile" label={NavigationLabel.profile}>
        <ProfileIcon type={getItemType('/profile')} />
      </HeaderItem>
    </header>
  );
}

export default AppHeader;
