import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import CardStyle from './card.module.css';

import { ingredientPropType } from '../../utils/prop-types.js';
import { OrderContext } from '../../utils/context';
import { OPEN_DETAILS } from '../../services/actions/details';

export default function Card({ card }) {
  const dispatch = useDispatch();

  const { getOrderedNum } = useContext(OrderContext);

  function processCardClick() {
    dispatch({ type: OPEN_DETAILS, card: card });
  }

  const orderedNum = getOrderedNum(card._id);
  return (
    <li className={CardStyle.card} onClick={processCardClick}>
      {orderedNum > 0 && <Counter count={orderedNum} size="default" />}
      <img src={card.image} alt={card.name} />
      <div className={CardStyle.price__box}>
        <p className={CardStyle.price}>{card.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={CardStyle.label}>{card.name}</p>
    </li>
  );
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
};
