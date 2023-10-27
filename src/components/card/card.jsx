import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './card.module.css';
import { ingredientPropType } from '../../utils';
import { Link } from 'react-router-dom';
import Price from '../price/price';

export default function Card({ card }) {
  const { items, bun } = useSelector((store) => store.burger);
  const location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { card },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const getOrderedNum = () => {
    if (card.type === 'bun') {
      return bun ? (bun._id === card._id ? 1 : 0) : 0;
    } else {
    }
    return items.reduce((acc, el) => {
      let add = 0;
      if (el.data._id === card._id) {
        add = 1;
      }
      return acc + add;
    }, 0);
  };

  const orderedNum = getOrderedNum();

  return (
    <Link
      to={`/ingredients/${card._id}`}
      state={{ backgroundLocation: location.pathname }}
      className={cardStyle.card__link}
    >
      <li ref={ref} className={cardStyle.card} style={{ opacity: opacity }}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}
        <img src={card.image} alt={card.name} />
        <Price price={card.price}></Price>
        <p className={cardStyle.label}>{card.name}</p>
      </li>
    </Link>
  );
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
};
