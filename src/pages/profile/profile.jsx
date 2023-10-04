import profileStyle from './profile.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../../services/actions/user';

export function Profile() {
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className={profileStyle.profile}>
      <nav className={profileStyle.navigation}>
        <li className={profileStyle['navigation__link-box']}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? profileStyle.navigation__link
                : profileStyle.navigation__link_inactive
            }
            to="/profile"
            end
          >
            Профиль
          </NavLink>
        </li>
        <li className={profileStyle['navigation__link-box']}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? profileStyle.navigation__link
                : profileStyle.navigation__link_inactive
            }
            to="orders"
          >
            История заказов
          </NavLink>
        </li>
        <li className={profileStyle['navigation__link-box']}>
          <NavLink
            className={profileStyle.navigation__link_inactive}
            onClick={logoutClick}
          >
            Выход
          </NavLink>
        </li>
        <p className={profileStyle['navigation__description']}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </div>
  );
}
