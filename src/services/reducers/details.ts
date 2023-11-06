import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
} from '../constants';

import { TOrder } from '../../utils';
import { TOrderDetailsActions } from '../actions';

type TOrderDetailsState = {
  detailsData: TOrder | null;
  detailsLoading: boolean;
  detailsFailed: boolean;
};

const initialState: TOrderDetailsState = {
  detailsData: null,
  detailsLoading: false,
  detailsFailed: false,
};

export const detailsReducer = (
  state: TOrderDetailsState = initialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        detailsLoading: true,
        detailsFailed: false,
        detailsData: null,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        detailsLoading: false,
        detailsFailed: false,
        detailsData: action.order[0],
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        detailsLoading: false,
        detailsFailed: true,
        detailsData: null,
      };
    }
    default: {
      return state;
    }
  }
};
