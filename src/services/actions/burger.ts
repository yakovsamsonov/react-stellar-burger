import { TIngredient, TBurgerIngredient } from '../../utils';
import {
  ADD_REGULAR,
  REMOVE_REGULAR,
  ADD_BUN,
  REMOVE_BUN,
  CHANGE_ORDER,
  CLEAR_BURGER,
} from '../constants';
import { SectionType } from '../../utils';

export interface IAddRegularAction {
  readonly type: typeof ADD_REGULAR;
  readonly uuid: string;
  readonly item: TIngredient;
}

export interface IRemoveRegularAction {
  readonly type: typeof REMOVE_REGULAR;
  readonly uuid: string;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly uuid: string;
  readonly item: TIngredient;
}

export interface IRemoveBunAction {
  readonly type: typeof REMOVE_BUN;
}

export interface IChangeOrderAction {
  readonly type: typeof CHANGE_ORDER;
  readonly uuid: string;
  readonly newIndex: number;
}

export interface IClearBurgerAction {
  readonly type: typeof CLEAR_BURGER;
}

export type TBurgerActions =
  | IAddBunAction
  | IAddRegularAction
  | IChangeOrderAction
  | IClearBurgerAction
  | IRemoveBunAction
  | IRemoveRegularAction;

export const addIngredient = (
  uuid: string,
  item: TIngredient
): IAddBunAction | IAddRegularAction => {
  if (item.type === SectionType.bun) {
    return { type: ADD_BUN, uuid, item };
  } else {
    return { type: ADD_REGULAR, uuid, item };
  }
};

export const removeIngredient = (
  item: TBurgerIngredient | TIngredient
): IRemoveBunAction | IRemoveRegularAction => {
  if ('uuid' in item) {
    return { type: REMOVE_REGULAR, uuid: item.uuid };
  } else {
    return { type: REMOVE_BUN };
  }
};

export const changeOrder = (
  uuid: string,
  newIndex: number
): IChangeOrderAction => ({ type: CHANGE_ORDER, uuid, newIndex });

export const clearBurger = (): IClearBurgerAction => ({ type: CLEAR_BURGER });
