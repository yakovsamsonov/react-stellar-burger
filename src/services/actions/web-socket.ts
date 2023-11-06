import { TOrdersHistory } from '../../utils';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../constants';

export interface IWsConnStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly code: number;
  readonly reason: string;
}

export interface IWsConnGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly ordersHist: TOrdersHistory;
}

export type TWsConnActions =
  | IWsConnCloseAction
  | IWsConnErrorAction
  | IWsConnGetMessageAction
  | IWsConnSuccessAction
  | IWsConnStartAction;

export const wsStartConnection = (payload: string): IWsConnStartAction => ({
  type: WS_CONNECTION_START,
  payload,
});

export const wsCloseConnection = (
  code: number = 1000,
  reason: string = 'leave page'
): IWsConnCloseAction => ({
  type: WS_CONNECTION_CLOSED,
  code,
  reason,
});
