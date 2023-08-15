import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroupStyle from './ingredients-group.module.css';
import {
  BOTTOM_ING_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from '../constants/constants';
import { REMOVE_REGULAR } from '../../services/actions/burger';

function IngredientsGroup({ groupType }) {
  const { items } = useSelector((store) => store.burger);
  const dispatch = useDispatch();

  const baseClass = IngredientsGroupStyle.item__group;
  const extraClass = groupType === REGULAR_ING_TYPE ? 'custom-scroll' : '';
  const itemsCount = items.length;
  const groupData = items.filter((el) => el.type === groupType);

  const clickDeleteButton = (uuid) => {
    dispatch({ type: REMOVE_REGULAR, uuid: uuid });
  };

  function getLabel(element) {
    let label = element.data.name;
    if (element.type === TOP_ING_TYPE) {
      label = label + ' (верх)';
    } else if (element.type === BOTTOM_ING_TYPE) {
      label = label + ' (низ)';
    }
    return label;
  }
  return (
    itemsCount !== 0 && (
      <ul
        className={baseClass.concat(' ', extraClass)}
        style={
          groupType === REGULAR_ING_TYPE
            ? { overflowY: 'scroll', paddingRight: '4px' }
            : { paddingLeft: '32px', paddingRight: '16px' }
        }
      >
        {groupData.map((el) => (
          <li className={IngredientsGroupStyle.item} key={el.uuid}>
            {groupType === REGULAR_ING_TYPE && <DragIcon type="primary" />}
            <ConstructorElement
              type={groupType}
              isLocked={groupType !== REGULAR_ING_TYPE}
              text={getLabel(el)}
              price={el.data.price}
              thumbnail={el.data.image}
              handleClose={() => {
                clickDeleteButton(el.uuid);
              }}
            />
          </li>
        ))}
      </ul>
    )
  );
}

IngredientsGroup.propTypes = {
  groupType: PropTypes.string.isRequired,
};

export default IngredientsGroup;
