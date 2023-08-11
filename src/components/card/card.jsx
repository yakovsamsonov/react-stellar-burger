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

function CardDetails(props) {
  const { onClose, card } = props;

  const { orderChanger } = useContext(OrderContext);

  return (
    <Modal onClose={onClose} header="Детали ингридиента">
      <div className={CardStyle['card-details']}>
        <img
          className={CardStyle['card-details__image']}
          src={card.image}
          alt={card.name}
          onClick={() =>
            orderChanger({
              type: 'add',
              ingredient: card,
            })
          }
        />
        <p className={CardStyle.label}>{card.name}</p>
        <ul className={CardStyle['nutrition']}>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Калории, ккал</p>
            <p className={CardStyle['nutrition__item-value']}>
              {card.calories}
            </p>
          </li>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Белки, г</p>
            <p className={CardStyle['nutrition__item-value']}>
              {card.proteins}
            </p>
          </li>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Жиры, г</p>
            <p className={CardStyle['nutrition__item-value']}>{card.fat}</p>
          </li>
          <li className={CardStyle['nutrition__item']}>
            <p className={CardStyle['nutrition__item-label']}>Углеводы, г</p>
            <p className={CardStyle['nutrition__item-value']}>
              {card.carbohydrates}
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
