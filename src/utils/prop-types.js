import PropTypes from "prop-types";

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

const orderedItemPropType = PropTypes.shape({
  data: ingredientPropType.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
});

export const headerItemPropType = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export const orderPropType = {
  data: ingredientPropType.isRequired,
};

export const burgerIngredientPropType = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  content: PropTypes.arrayOf(orderedItemPropType).isRequired,
  addToOrder: PropTypes.func,
  removeFromOrder: PropTypes.func,
  getOrderedNum: PropTypes.func,
};

export const burgerConstructorPropType = {
  content: PropTypes.arrayOf(orderedItemPropType).isRequired,
  totalPrice: PropTypes.number.isRequired,
  removeFromOrder: PropTypes.func,
};

export const ingredientsGroupPropType = {
  groupType: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(orderedItemPropType).isRequired,
  removeFromOrder: PropTypes.func,
};

export const sectionPropType = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  addToOrder: PropTypes.func,
  removeFromOrder: PropTypes.func,
  getOrderedNum: PropTypes.func,
};

export const cardPropType = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToOrder: PropTypes.func,
  removeFromOrder: PropTypes.func,
  getOrderedNum: PropTypes.func,
};
