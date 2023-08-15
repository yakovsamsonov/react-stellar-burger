import HeaderItemStyle from './header-item.module.css';
import PropTypes from 'prop-types';

function HeaderItem(props) {
  function addInactiveClass() {
    if (props.selected !== props.name) {
      return ' text_color_inactive';
    }
    return '';
  }

  const labelClass = `${HeaderItemStyle.label}${addInactiveClass()}`;

  return (
    <a
      href="#"
      className={HeaderItemStyle.item}
      onClick={(e) => {
        props.onClick(props.name);
      }}
    >
      {props.children}
      <p className={labelClass}>{props.label}</p>
    </a>
  );
}

HeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default HeaderItem;
