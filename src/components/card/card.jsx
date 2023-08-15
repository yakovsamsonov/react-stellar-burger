import { useState, useContext } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import CardStyle from './card.module.css';
import CardDetails from '../card-details/card-details';
import { ingredientPropType } from '../../utils/prop-types.js';
import { OrderContext } from '../../utils/context';

export default function Card(props) {
  const { card } = props;

  const [visible, setVisible] = useState(false);

  const { getOrderedNum } = useContext(OrderContext);

  const closeModal = () => {
    setVisible(false);
  };

  function processClick() {
    setVisible(true);
  }

  const modal = <CardDetails card={card} onClose={closeModal}></CardDetails>;

  const orderedNum = getOrderedNum(card._id);
  return (
    <>
      <li className={CardStyle.card} onClick={processClick}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}
        <img src={card.image} alt={card.name} />
        <div className={CardStyle.price__box}>
          <p className={CardStyle.price}>{card.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={CardStyle.label}>{card.name}</p>
      </li>
      {visible && modal}
    </>
  );
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
};
