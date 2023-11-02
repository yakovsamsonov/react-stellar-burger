import { placeOrder } from '../../utils/burger-api';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_ORDER,
  CLOSE_ORDER,
} from '../constants';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
  readonly ingredients: ReadonlyArray<string>;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IOpenOrderAction {
  readonly type: typeof OPEN_ORDER;
}

export interface ICloseOrderAction {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderActions =
  | ICloseOrderAction
  | IOpenOrderAction
  | IGetOrderFailedAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction;

export const getOrderRequest = (
  ingredients: Array<string>
): IGetOrderRequestAction => ({
  type: GET_ORDER_REQUEST,
  ingredients,
});

export const getOrderSuccess = (
  orderNumber: number
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  orderNumber,
});

export const getOrderFailed = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
});

export const openOrder = (): IOpenOrderAction => ({
  type: OPEN_ORDER,
});

export const closeOrder = (): ICloseOrderAction => ({
  type: CLOSE_ORDER,
});

export const sendOrder = (ingredients: Array<string>) => (dispatch: any) => {
  dispatch(getOrderRequest(ingredients));
  return placeOrder(ingredients)
    .then((data) => {
      dispatch(getOrderSuccess(data.order.number));
    })
    .catch((e) => {
      dispatch(getOrderFailed);
    });
};
