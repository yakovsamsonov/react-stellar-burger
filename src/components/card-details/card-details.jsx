import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardDetailsStyle from './card-details.module.css';
import Modal from '../modal/modal';
import NutritionItem from '../nutrition-item/nutrition-item';
import { OrderContext } from '../../utils/context';
import { CLOSE_DETAILS } from '../../services/actions/details.js';

export default function CardDetails() {
  const { card } = useSelector((store) => store.details);
  const dispatch = useDispatch();

  const processCardDetailsClose = () => {
    dispatch({ type: CLOSE_DETAILS });
  };

  //const { orderChanger } = useContext(OrderContext);

  return (
    <Modal onClose={processCardDetailsClose} header="Детали ингридиента">
      <div className={CardDetailsStyle['card-details']}>
        <img
          className={CardDetailsStyle['card-details__image']}
          src={card.image}
          alt={card.name}
          /*onClick={() =>
            orderChanger({
              type: 'add',
              ingredient: card,
            })
          }*/
        />
        <p className={CardDetailsStyle.label}>{card.name}</p>
        <ul className={CardDetailsStyle['nutrition']}>
          <NutritionItem
            label="Калории, ккал"
            value={card.calories}
          ></NutritionItem>
          <NutritionItem label="Белки, г" value={card.proteins}></NutritionItem>
          <NutritionItem label="Жиры, г" value={card.fat}></NutritionItem>
          <NutritionItem
            label="Углеводы, г"
            value={card.carbohydrates}
          ></NutritionItem>
        </ul>
      </div>
    </Modal>
  );
}
