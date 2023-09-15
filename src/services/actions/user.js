import {
  registerUser,
  loginRequest,
  logoutRequest,
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function registerNewUser(user) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    return registerUser(user)
      .then((d) => {
        if (d.success) {
          setCookie('accessToken', d.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', d.refreshToken);
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: d.user,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function login(user) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return loginRequest(user)
      .then((d) => {
        if (d.success) {
          setCookie('accessToken', d.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', d.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user: d.user,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    return logoutRequest()
      .then((d) => {
        if (d.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      })
      .catch((e) => {
        dispatch({
          type: LOGOUT_FAILED,
          errorMessage: e.message,
        });
      });
  };
}
