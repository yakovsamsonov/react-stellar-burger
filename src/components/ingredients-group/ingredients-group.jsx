import { useContext } from 'react';
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
import { OrderContext } from '../../utils/context';

function IngredientsGroup(props) {
  const { groupType } = props;

  const baseClass = IngredientsGroupStyle.item__group;
  const extraClass = groupType === REGULAR_ING_TYPE ? 'custom-scroll' : '';
  const { order, orderChanger } = useContext(OrderContext);
  const itemsCount = order.items.length;
  const data = order.items.filter((el) => el.type === groupType);

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
        {data.map((el) => (
          <li className={IngredientsGroupStyle.item} key={el.data._id}>
            {groupType === REGULAR_ING_TYPE && <DragIcon type="primary" />}
            <ConstructorElement
              type={groupType}
              isLocked={groupType !== REGULAR_ING_TYPE}
              text={getLabel(el)}
              price={el.data.price}
              thumbnail={el.data.image}
              handleClose={() => {
                orderChanger({
                  type: 'remove',
                  ingredient: el.data,
                });
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
