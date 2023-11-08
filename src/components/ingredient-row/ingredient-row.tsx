import IngredientRowStyle from './ingredient-row.module.css';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { Price } from '../price/price';
import { TOrderIngredient } from '../../utils';
import { FC } from 'react';

type TIngredientRow = {
  ingredient: TOrderIngredient;
};

export const IngredientRow: FC<TIngredientRow> = ({ ingredient }) => {
  return (
    <div className={IngredientRowStyle['ingredient_row']}>
      <IngredientIcon order={0} image={ingredient.image}></IngredientIcon>
      <p className={IngredientRowStyle['ingredient_row__label']}>
        {ingredient.name}
      </p>
      <Price price={`${ingredient.count} x ${ingredient.price}`}></Price>
    </div>
  );
};
