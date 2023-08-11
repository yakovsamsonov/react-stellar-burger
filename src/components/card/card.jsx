import { useState, useContext } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import CardStyle from './card.module.css';
import { cardPropType, cardDetailsPropType } from '../../utils/prop-types.js';
import Modal from '../modal/modal';
import { OrderContext } from '../../utils/context';

function Card(props) {
  const [visible, setVisible] = useState(false);

  const { getOrderedNum } = useContext(OrderContext);

  const closeModal = () => {
    setVisible(false);
  };

  function processClick() {
    setVisible(true);
  }

  const modal = (
    <CardDetails card={props.card} onClose={closeModal}></CardDetails>
  );

  const orderedNum = getOrderedNum(props.card._id);
  return (
    <>
      <li className={CardStyle.card} onClick={processClick}>
        {orderedNum > 0 && <Counter count={orderedNum} size="default" />}

        <img src={props.card.image} alt={props.card.name} />
        <div className={CardStyle.price__box}>
          <p className={CardStyle.price}>{props.card.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={CardStyle.label}>{props.card.name}</p>
      </li>
      {visible && modal}
    </>
  );
}

function CardDetails(props) {
  const { addToOrder } = useContext(OrderContext);

  return (
    <Modal onClose={props.onClose} header="Детали ингридиента">
      <div className={CardStyle['card-details']}>
        <img
          className={CardStyle['card-details__image']}
          src={props.card.image}
          alt={props.card.name}
          onClick={() => addToOrder(props.card._id)}
        />
        <p className={CardStyle.label}>{props.card.name}</p>
        <ul className={CardStyle['nutrition']}>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Калории, ккал</p>
            <p className={CardStyle['nutrition__item-value']}>
              {props.card.calories}
            </p>
          </li>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Белки, г</p>
            <p className={CardStyle['nutrition__item-value']}>
              {props.card.proteins}
            </p>
          </li>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Жиры, г</p>
            <p className={CardStyle['nutrition__item-value']}>
              {props.card.fat}
            </p>
          </li>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Углеводы, г</p>
            <p className={CardStyle['nutrition__item-value']}>
              {props.card.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </Modal>
  );
}

Card.propTypes = cardPropType;
CardDetails.propTypes = cardDetailsPropType;

export default Card;
