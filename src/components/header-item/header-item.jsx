import { useSelector, useDispatch } from 'react-redux';
import HeaderItemStyle from './header-item.module.css';
import PropTypes from 'prop-types';
import { TAB_SWITCH } from '../../services/actions/tab';

function HeaderItem(props) {
  const { name } = useSelector((store) => store.selectedTab);

  const dispatch = useDispatch();

  const setActiveTab = () => {
    dispatch({ type: TAB_SWITCH, value: props.name });
  };

  function addInactiveClass() {
    if (name !== props.name) {
      return ' text_color_inactive';
    }
    return '';
  }

  const labelClass = `${HeaderItemStyle.label}${addInactiveClass()}`;

  return (
    <a href="#" className={HeaderItemStyle.item} onClick={setActiveTab}>
      {props.children}
      <p className={labelClass}>{props.label}</p>
    </a>
  );
}

HeaderItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default HeaderItem;
