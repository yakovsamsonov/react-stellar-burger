import { NavLink, useLocation } from 'react-router-dom';
import HeaderItemStyle from './header-item.module.css';
import { FC } from 'react';

type THeaderItem = {
  to: string;
  label: string;
};

export const HeaderItem: FC<THeaderItem> = ({ to, children, label }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <NavLink to={to} className={HeaderItemStyle.item}>
      {children}
      <p
        className={
          (to !== '/' && pathname.includes(to)) ||
          (to === '/' && pathname === to)
            ? HeaderItemStyle.label
            : HeaderItemStyle.label_inactive
        }
      >
        {label}
      </p>
    </NavLink>
  );
};
