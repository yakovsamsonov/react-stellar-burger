import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardDetailsStyle from './card-details.module.css';
import NutritionItem from '../nutrition-item/nutrition-item';
import { useState, useCallback, useEffect } from 'react';

export default function CardDetails() {
  const { ingredients } = useSelector((store) => store.ingredients);

  const { id } = useParams();

  const findCard = useCallback(() => {
    return ingredients.find((el) => {
      return el._id === id;
    });
  }, [id, ingredients]);

  const [card, setCard] = useState(findCard());

  useEffect(() => {
    setCard(findCard());
  }, [findCard]);

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
  );
}
