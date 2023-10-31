import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './card.module.css';
import { Link } from 'react-router-dom';
import { Price } from '../price/price';
import { SectionType } from '../../utils';
import { burger } from '../../services/selectors/selectors';
import { TIngredient, TBurgerType } from '../../utils';

export type TCard = {
  type: TBurgerType;
  id: string;
  name: string;
  image: string;
  price: number;
}

export const Card: FC<TCard> = ({ type, id, name, image, price }) => {
  const { items, bun } = useSelector(burger);
  const location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const getOrderedNum = (): number => {
    if (type === SectionType.bun) {
      return bun ? (bun._id === id ? 1 : 0) : 0;
    } else {
    }
    return items.reduce((acc: number, el: {data: TIngredient}) => {
      let add = 0;
      if (el.data._id === id) {
        add = 1;
      }
      return acc + add;
    }, 0);
  };

  const orderedNum: number = getOrderedNum();

  return (
    <Link
      to={`/ingredients/${id}`}
      state={{ backgroundLocation: location.pathname }}
      className={cardStyle.card__link}
    >
      <li ref={ref} className={cardStyle.card} style={{ opacity: opacity }}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}
        <img src={image} alt={name} />
        <Price price={price}></Price>
        <p className={cardStyle.label}>{name}</p>
      </li>
    </Link>
  );
}
