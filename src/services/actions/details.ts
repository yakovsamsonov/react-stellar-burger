import { loadOrderDetails } from '../../utils/burger-api';
import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
} from '../constants';
import { TOrder } from '../../utils';
import { AppDispatch, AppThunk } from '../store';

export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly order: Array<TOrder>;
}

export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export type TOrderDetailsActions =
  | IGetOrderDetailsFailedAction
  | IGetOrderDetailsRequestAction
  | IGetOrderDetailsSuccessAction;

export const getOrderDetailsRequest = (): IGetOrderDetailsRequestAction => ({
  type: GET_ORDER_DETAILS_REQUEST,
});

export const getOrderDetailsSuccess = (
  order: Array<TOrder>
): IGetOrderDetailsSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  order,
});

export const getOrderDetailsFailed = (): IGetOrderDetailsFailedAction => ({
  type: GET_ORDER_DETAILS_FAILED,
});

export const getDetails: AppThunk =
  (orderNum: string) => (dispatch: AppDispatch) => {
    dispatch(getOrderDetailsRequest());
    loadOrderDetails(orderNum)
      .then((d) => {
        dispatch(getOrderDetailsSuccess(d.orders));
      })
      .catch(() => {
        dispatch(getOrderDetailsFailed());
      });
  };
