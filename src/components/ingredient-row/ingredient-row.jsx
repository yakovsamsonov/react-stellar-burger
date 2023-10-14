import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';
import { BUN_TYPE } from '../../utils';
import IngredientRowStyle from './ingredient-row.module.css';

export default function IngredientRow({ ingredient }) {
  return (
    <div className={IngredientRowStyle['ingredient_row']}>
      <IngredientIcon order={0} image={ingredient.image}></IngredientIcon>
      <p className={IngredientRowStyle['ingredient_row__label']}>
        {ingredient.name}
      </p>
      <Price
        price={`${ingredient.type === BUN_TYPE ? 2 : 1} x ${ingredient.price}`}
      ></Price>
    </div>
  );
}
