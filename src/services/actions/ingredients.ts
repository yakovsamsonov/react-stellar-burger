import { loadIngredients } from '../../utils/burger-api';
import { TIngredient } from '../../utils';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (
  ingredients: Array<TIngredient>
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
});

export const getIngredients = (): any => (dispatch: any) => {
  dispatch(getIngredientsRequest);
  loadIngredients()
    .then((d) => {
      dispatch(getIngredientsSuccess(d.data));
    })
    .catch((e) => {
      dispatch(getIngredientsFailed);
    });
};
