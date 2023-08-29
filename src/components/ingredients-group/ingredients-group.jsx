import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
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
} from '../../utils/constants';
import { REMOVE_REGULAR, CHANGE_ORDER } from '../../services/actions/burger';

function IngredientsGroup({ groupType }) {
  const { items } = useSelector((store) => store.burger);
  const baseClass = IngredientsGroupStyle.item__group;
  const extraClass = groupType === REGULAR_ING_TYPE ? 'custom-scroll' : '';
  const itemsCount = items.length;
  const groupData = items.filter((el) => el.type === groupType);

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
        {groupData.map((el, index) => (
          <Ingredient ingredient={el} key={el.uuid} index={index} />
        ))}
      </ul>
    )
  );
}

function Ingredient({ ingredient, index }) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ opacity }, drag] = useDrag({
    type: 'regular',
    canDrag: ingredient.type === REGULAR_ING_TYPE,
    item: { id: ingredient.uuid, index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  function getLabel(element) {
    let label = element.data.name;
    if (element.type === TOP_ING_TYPE) {
      label = label + ' (верх)';
    } else if (element.type === BOTTOM_ING_TYPE) {
      label = label + ' (низ)';
    }
    return label;
  }

  const [, drop] = useDrop({
    accept: 'regular',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(item.id, hoverIndex);
    },
  });

  const moveIngredient = (id, newIndex = 1) => {
    dispatch({ type: CHANGE_ORDER, uuid: id, newIndex: newIndex });
  };

  const clickDeleteButton = () => {
    dispatch({ type: REMOVE_REGULAR, uuid: ingredient.uuid });
  };

  drag(drop(ref));

  return (
    <li
      className={IngredientsGroupStyle.item}
      ref={ref}
      style={{ opacity: opacity }}
    >
      {ingredient.type === REGULAR_ING_TYPE && <DragIcon type="primary" />}
      <ConstructorElement
        type={ingredient.type}
        isLocked={ingredient.type !== REGULAR_ING_TYPE}
        text={getLabel(ingredient)}
        price={ingredient.data.price}
        thumbnail={ingredient.data.image}
        handleClose={clickDeleteButton}
      />
    </li>
  );
}

IngredientsGroup.propTypes = {
  groupType: PropTypes.string.isRequired,
};

export default IngredientsGroup;
