import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_ORDER,
  CLOSE_ORDER,
} from '../constants';

import { TOrderActions } from '../actions';

type TOrderState = {
  orderOpen: boolean;
  ingredients: Array<string>;
  number: number;
  orderLoading: boolean;
  orderFailed: boolean;
};

const initialState: TOrderState = {
  orderOpen: false,
  ingredients: [],
  number: 0,
  orderLoading: false,
  orderFailed: false,
};

export const orderReducer = (
  state: TOrderState = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        ingredients: action.ingredients,
        orderLoading: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.orderNumber,
        orderLoading: false,
        orderFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        ingredients: initialState.ingredients,
        orderLoading: false,
        orderFailed: true,
      };
    }
    case OPEN_ORDER: {
      return {
        ...state,
        orderOpen: true,
      };
    }
    case CLOSE_ORDER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
