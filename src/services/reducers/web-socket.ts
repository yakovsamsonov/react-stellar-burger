import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../constants';

import { TWsConnActions } from '../actions';
import { TOrder } from '../../utils';

type TWebSockeState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (
  state: TWebSockeState = initialState,
  action: TWsConnActions
): TWebSockeState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        orders: initialState.orders,
        total: initialState.total,
        totalToday: initialState.totalToday,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.ordersHist.orders,
        total: action.ordersHist.total,
        totalToday: action.ordersHist.totalToday,
      };

    default:
      return state;
  }
};
