import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './card.module.css';

import { ingredientPropType } from '../../utils/prop-types.js';
import { OPEN_DETAILS } from '../../services/actions/details';

export default function Card({ card }) {
  const { items, bun } = useSelector((store) => store.burger);
  const dispatch = useDispatch();

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

  function processCardClick() {
    dispatch({ type: OPEN_DETAILS, card: card });
  }

  const orderedNum = getOrderedNum();

  return (
    <li
      ref={ref}
      className={cardStyle.card}
      onClick={processCardClick}
      style={{ opacity: opacity }}
    >
      {orderedNum > 0 && <Counter count={orderedNum} size="default" />}
      <img src={card.image} alt={card.name} />
      <div className={cardStyle.price__box}>
        <p className={cardStyle.price}>{card.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={cardStyle.label}>{card.name}</p>
    </li>
  );
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
};
