import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroupStyle from './ingredients-group.module.css';
import { PositionType } from '../../utils/constants';
import { REMOVE_REGULAR, CHANGE_ORDER } from '../../services/actions/burger';

function IngredientsGroup() {
  const { items } = useSelector((store) => store.burger);

  return (
    <ul
      className={`${IngredientsGroupStyle.item__group} custom-scroll`}
      style={{ overflowY: 'scroll', paddingRight: '4px' }}
    >
      {items.map((el, index) => (
        <RegularIngredient ingredient={el} key={el.uuid} index={index} />
      ))}
    </ul>
  );
}

function RegularIngredient({ ingredient, index }) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ opacity }, drag] = useDrag({
    type: 'regular',
    item: { id: ingredient.uuid, index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

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
      <DragIcon type="primary" />
      <ConstructorElement
        type={PositionType.regular}
        isLocked={false}
        text={ingredient.data.name}
        price={ingredient.data.price}
        thumbnail={ingredient.data.image}
        handleClose={clickDeleteButton}
      />
    </li>
  );
}

function BunIngredient({ ingredient, type }) {
  function getLabel(element) {
    let label = element.name;
    if (type === PositionType.top) {
      label = label + ' (верх)';
    } else if (type === PositionType.bottom) {
      label = label + ' (низ)';
    }
    return label;
  }

  return (
    <ul
      className={IngredientsGroupStyle.item__group}
      style={{ paddingLeft: '32px', paddingRight: '16px' }}
    >
      <li className={IngredientsGroupStyle.item}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text={getLabel(ingredient)}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </li>
    </ul>
  );
}

export { IngredientsGroup, BunIngredient };
