import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types.js';
import CardDetailsStyle from './card-details.module.css';
import Modal from '../modal/modal';
import NutritionItem from '../nutrition-item/nutrition-item';
import { OrderContext } from '../../utils/context';

export default function CardDetails(props) {
  const { onClose, card } = props;

  const { orderChanger } = useContext(OrderContext);

  return (
    <Modal onClose={onClose} header="Детали ингридиента">
      <div className={CardDetailsStyle['card-details']}>
        <img
          className={CardDetailsStyle['card-details__image']}
          src={card.image}
          alt={card.name}
          onClick={() =>
            orderChanger({
              type: 'add',
              ingredient: card,
            })
          }
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

CardDetails.propTypes = {
  card: ingredientPropType.isRequired,
  onClose: PropTypes.func.isRequired,
};
