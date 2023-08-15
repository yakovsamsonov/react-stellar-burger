import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';
import { detailsReducer } from './details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  details: detailsReducer,
  order: orderReducer,
});
