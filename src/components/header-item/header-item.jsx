import { NavLink, useLocation } from 'react-router-dom';
import HeaderItemStyle from './header-item.module.css';
import PropTypes from 'prop-types';

function HeaderItem(props) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <NavLink to={props.to} className={HeaderItemStyle.item}>
      {props.children}
      <p
        className={
          (props.to !== '/' && pathname.includes(props.to)) ||
          (props.to === '/' && pathname === props.to)
            ? HeaderItemStyle.label
            : HeaderItemStyle.label_inactive
        }
      >
        {props.label}
      </p>
    </NavLink>
  );
}

HeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default HeaderItem;
