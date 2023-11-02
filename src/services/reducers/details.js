import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
} from '../constants';

const initialState = {
  detailsData: {},
  detailsLoading: false,
  detailsFailed: false,
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        detailsLoading: true,
        detailsFailed: false,
        detailsData: {},
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
        detailsData: {},
      };
    }
    default: {
      return state;
    }
  }
};
