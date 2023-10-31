import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardDetailsStyle from './card-details.module.css';
import { NutritionItem } from '../nutrition-item/nutrition-item';
import { useState, useCallback, useEffect } from 'react';
import { ingredients as ingredientsSelector } from '../../services/selectors/selectors';
import { TIngredient } from '../../utils';

export default function CardDetails() {
  const { ingredients } = useSelector(ingredientsSelector);

  const { id } = useParams();

  const findCard = useCallback(
    (id: string | undefined): TIngredient | undefined => {
      return ingredients.find((el: TIngredient) => {
        return el._id === id;
      });
    },
    [ingredients]
  );

  const [card, setCard] = useState<TIngredient | undefined>(findCard(id));

  useEffect(() => {
    setCard(findCard(id));
  }, [id, findCard]);

  if (card) {
    return (
      <div className={CardDetailsStyle['card-details']}>
        <h2 className={CardDetailsStyle['card-details__label']}>
          Детали ингридиента
        </h2>
        <img
          className={CardDetailsStyle['card-details__image']}
          src={card.image}
          alt={card.name}
        />
        <p className={CardDetailsStyle['label']}>{card.name}</p>
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
    );
  } else
    return (
      <div className={CardDetailsStyle['card-details']}>
        <p className={CardDetailsStyle['label']}>
          На нашей планете такой ингредиент недоступен
        </p>
      </div>
    );
}
