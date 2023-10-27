import { loadOrderDetails } from '../../utils/burger-api';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export function getDetails(orderNum) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
    });
    loadOrderDetails(orderNum)
      .then((d) => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          order: d.orders,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_DETAILS_FAILED,
        });
      });
  };
}
