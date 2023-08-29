import { placeOrder } from '../../utils/burger-api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const OPEN_ORDER = 'OPEN_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export function sendOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
      ingredients: ingredients,
    });
    return placeOrder(ingredients)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          number: data.order.number,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
