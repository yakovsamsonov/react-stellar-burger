import { useRef, FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroupStyle from './ingredients-group.module.css';
import { PositionType, TBurgerIngredient, TIngredient } from '../../utils';
import { changeOrder, removeIngredient } from '../../services/actions';
import { burger as burgerSelector } from '../../services/selectors/selectors';

type TRegularIngredient = {
  ingredient: TBurgerIngredient;
  index: number;
};

type TBunIngredient = {
  ingredient: TIngredient;
  type: 'top' | 'bottom';
};

export const IngredientsGroup: FC = () => {
  const { items } = useSelector(burgerSelector);

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
};

const RegularIngredient: FC<TRegularIngredient> = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [{ opacity }, drag] = useDrag({
    type: 'regular',
    item: { id: ingredient.uuid, index: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, drop] = useDrop<{ id: string; index: number }, unknown, unknown>({
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
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveIngredient(item.id, hoverIndex);
      }
    },
  });

  const moveIngredient = (id: string, newIndex: number = 1): void => {
    dispatch(changeOrder(id, newIndex));
  };

  const clickDeleteButton = (): void => {
    dispatch(removeIngredient(ingredient));
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
        isLocked={false}
        text={ingredient.data.name}
        price={ingredient.data.price}
        thumbnail={ingredient.data.image}
        handleClose={clickDeleteButton}
      />
    </li>
  );
};

export const BunIngredient: FC<TBunIngredient> = ({ ingredient, type }) => {
  const getLabel = useCallback(
    (element: TIngredient) => {
      let label = element.name;
      if (type === PositionType.top) {
        label = label + ' (верх)';
      } else if (type === PositionType.bottom) {
        label = label + ' (низ)';
      }
      return label;
    },
    [type]
  );

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
};
