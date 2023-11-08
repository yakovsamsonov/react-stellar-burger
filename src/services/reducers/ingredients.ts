import { TIngredient } from '../../utils';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants';
import { TIngredientsActions } from '../actions';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  ingredientsLoading: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state: TIngredientsState = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsLoading: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ingredients: action.ingredients,
        ingredientsLoading: false,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
