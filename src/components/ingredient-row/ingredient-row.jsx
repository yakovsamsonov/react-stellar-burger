import IngredientRowStyle from './ingredient-row.module.css';
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import { Price } from '../price/price';
import PropTypes from 'prop-types';

export default function IngredientRow({ ingredient }) {
  return (
    <div className={IngredientRowStyle['ingredient_row']}>
      <IngredientIcon order={0} image={ingredient.image}></IngredientIcon>
      <p className={IngredientRowStyle['ingredient_row__label']}>
        {ingredient.name}
      </p>
      <Price price={`${ingredient.count} x ${ingredient.price}`}></Price>
    </div>
  );
}

IngredientRow.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};
