import PropTypes from 'prop-types';

const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const headerItemPropType = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export const orderPropType = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export const burgerIngredientPropType = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export const burgerConstructorPropType = {};

export const ingredientsGroupPropType = {
  groupType: PropTypes.string.isRequired,
};

export const sectionPropType = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export const cardPropType = {
  card: ingredientPropType.isRequired,
};

export const cardDetailsPropType = {
  card: ingredientPropType.isRequired,
  onClose: PropTypes.func,
};

export const orderDetailsPropType = {
  onClose: PropTypes.func,
};
