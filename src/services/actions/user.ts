import {
  registerUser,
  loginRequest,
  logoutRequest,
  getUserRequestWithRefresh,
  updateUser,
  requestChangeToken,
  changePassword,
} from '../../utils/burger-api';
import { deleteCookie } from '../../utils/cookie';
import {
  modify,
  ADD_TO_STORAGE,
  REMOVE_FROM_STORAGE,
} from '../../utils/local-storage';
import { PASSWORD_RESET_TOKEN_SEND } from '../../utils/constants';
import { Cookies } from '../../utils';

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' =
  'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' =
  'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' =
  'REGISTER_USER_FAILED';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';
export const USER_SUCCESS: 'USER_SUCCESS' = 'USER_SUCCESS';
export const USER_FAILED: 'USER_FAILED' = 'USER_FAILED';
export const USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST' = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS' = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED: 'USER_UPDATE_FAILED' = 'USER_UPDATE_FAILED';
export const PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST' =
  'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_TOKEN_FAILED: 'PASSWORD_RESET_TOKEN_FAILED' =
  'PASSWORD_RESET_TOKEN_FAILED';

type TPassword = {
  password: string;
};

type TEmail = {
  email: string;
};

type TUser = TEmail & TPassword;

type TPasswordUpdate = TPassword & {
  token: string;
};

type TNewUser = TUser & {
  name: string;
};

export function registerNewUser(user: TNewUser) {
  return function (dispatch: any) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    return registerUser(user)
      .then((d) =>
        dispatch({
          type: REGISTER_USER_SUCCESS,
        })
      )
      .catch((e) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function login(user: TUser) {
  return function (dispatch: any) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return loginRequest(user)
      .then((d) => {
        dispatch({
          type: LOGIN_SUCCESS,
          user: d.user,
        });
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
  return function (dispatch: any) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    return logoutRequest()
      .then((d) => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        deleteCookie(Cookies.access);
        deleteCookie(Cookies.refresh);
      })
      .catch((e) => {
        dispatch({
          type: LOGOUT_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function setUser() {
  return function (dispatch: any) {
    dispatch({
      type: USER_REQUEST,
    });
    return getUserRequestWithRefresh()
      .then((d) => {
        dispatch({
          type: USER_SUCCESS,
          user: d.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: USER_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function updateUserData(newUserData: TNewUser) {
  return function (dispatch: any) {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    return updateUser(newUserData)
      .then((d) => {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          user: d.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: USER_UPDATE_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function requestPasswordChange(email: TEmail) {
  return function (dispatch: any) {
    dispatch({ type: PASSWORD_RESET_REQUEST });
    return requestChangeToken(email)
      .then((d) => {
        modify(ADD_TO_STORAGE, PASSWORD_RESET_TOKEN_SEND, true);
      })
      .catch((e) => {
        dispatch({
          type: PASSWORD_RESET_TOKEN_FAILED,
          errorMessage: e.message,
        });
      });
  };
}

export function confirmPasswordChange(request: TPasswordUpdate) {
  return function (dispatch: any) {
    dispatch({ type: PASSWORD_RESET_REQUEST });
    return changePassword(request)
      .then((d) => {
        modify(REMOVE_FROM_STORAGE, PASSWORD_RESET_TOKEN_SEND);
      })
      .catch((e) => {
        dispatch({
          type: PASSWORD_RESET_TOKEN_FAILED,
          errorMessage: e.message,
        });
      });
  };
}
