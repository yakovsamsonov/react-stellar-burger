import {
  Cookies,
  deleteCookie,
  modify,
  StorageAction,
  StorageActionKey,
  registerUser,
  login,
  logout,
  getUserRequestWithRefresh,
  updateUser,
  requestChangeToken,
  changePassword,
  TUser,
  TNewUser,
  TUserWithPassword,
  TEmail,
  TPasswordUpdate,
} from '../../utils';

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_TOKEN_FAILED,
} from '../constants';
import { AppDispatch, AppThunk } from '../store';

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly errorMessage: string;
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly errorMessage: string;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly errorMessage: string;
}

export interface IUserRequestAction {
  readonly type: typeof USER_REQUEST;
}

export interface IUserSuccessAction {
  readonly type: typeof USER_SUCCESS;
  readonly user: TUser;
}

export interface IUserFailedAction {
  readonly type: typeof USER_FAILED;
  readonly errorMessage: string;
}

export interface IUserUpdateRequestAction {
  readonly type: typeof USER_UPDATE_REQUEST;
}

export interface IUserUpdateSuccessAction {
  readonly type: typeof USER_UPDATE_SUCCESS;
  readonly user: TUser;
}

export interface IUserUpdateFailedAction {
  readonly type: typeof USER_UPDATE_FAILED;
  readonly errorMessage: string;
}

export interface IPasswordResetRequestAction {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetFailedAction {
  readonly type: typeof PASSWORD_RESET_TOKEN_FAILED;
  readonly errorMessage: string;
}

export type TUserActions =
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IUserRequestAction
  | IUserSuccessAction
  | IUserFailedAction
  | IUserUpdateRequestAction
  | IUserUpdateSuccessAction
  | IUserUpdateFailedAction
  | IPasswordResetRequestAction
  | IPasswordResetFailedAction;

export const registerNewUserRequest = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST,
});

export const registerNewUserSuccess = (): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerNewUserFailed = (
  errorMessage: string
): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED,
  errorMessage,
});

export const loginRequest = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user: TUser): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailed = (errorMessage: string): ILoginFailedAction => ({
  type: LOGIN_FAILED,
  errorMessage,
});

export const logoutRequest = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailed = (errorMessage: string): ILogoutFailedAction => ({
  type: LOGOUT_FAILED,
  errorMessage,
});

export const userRequest = (): IUserRequestAction => ({
  type: USER_REQUEST,
});

export const userSuccess = (user: TUser): IUserSuccessAction => ({
  type: USER_SUCCESS,
  user,
});

export const userFailed = (errorMessage: string): IUserFailedAction => ({
  type: USER_FAILED,
  errorMessage,
});

export const userUpdateRequest = (): IUserUpdateRequestAction => ({
  type: USER_UPDATE_REQUEST,
});

export const userUpdateSuccess = (user: TUser): IUserUpdateSuccessAction => ({
  type: USER_UPDATE_SUCCESS,
  user,
});

export const userUpdateFailed = (
  errorMessage: string
): IUserUpdateFailedAction => ({
  type: USER_UPDATE_FAILED,
  errorMessage,
});

export const passwordResetRequest = (): IPasswordResetRequestAction => ({
  type: PASSWORD_RESET_REQUEST,
});

export const passwordResetFailed = (
  errorMessage: string
): IPasswordResetFailedAction => ({
  type: PASSWORD_RESET_TOKEN_FAILED,
  errorMessage,
});

export const registerNewUser: AppThunk<Promise<any>> =
  (user: TNewUser) => (dispatch: AppDispatch) => {
    dispatch(registerNewUserRequest());
    return registerUser(user)
      .then(() => dispatch(registerNewUserSuccess()))
      .catch((e) => {
        dispatch(registerNewUserFailed(e.message));
      });
  };

export const performLogin: AppThunk<Promise<any>> =
  (user: TUserWithPassword) => (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    return login(user)
      .then((d) => {
        dispatch(loginSuccess(d.user));
      })
      .catch((e) => {
        dispatch(loginFailed(e.message));
      });
  };

export const performLogout: AppThunk<Promise<any>> =
  () => (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    return logout()
      .then(() => {
        dispatch(logoutSuccess());
        deleteCookie(Cookies.access);
        deleteCookie(Cookies.refresh);
      })
      .catch((e) => {
        dispatch(loginFailed(e.message));
      });
  };

export const setUser: AppThunk<Promise<any>> =
  () => (dispatch: AppDispatch) => {
    dispatch(userRequest());
    return getUserRequestWithRefresh()
      .then((d) => {
        dispatch(userSuccess(d.user));
      })
      .catch((e) => {
        dispatch(userFailed(e.message));
      });
  };

export const updateUserData: AppThunk<Promise<any>> =
  (newUserData: TNewUser) => (dispatch: AppDispatch) => {
    dispatch(userUpdateRequest());
    return updateUser(newUserData)
      .then((d) => {
        dispatch(userUpdateSuccess(d.user));
      })
      .catch((e) => {
        dispatch(userUpdateFailed(e.message));
      });
  };

export const requestPasswordChange: AppThunk<Promise<any>> =
  (email: TEmail) => (dispatch: AppDispatch) => {
    dispatch(passwordResetRequest());
    return requestChangeToken(email)
      .then((d) => {
        modify(
          StorageAction.add,
          StorageActionKey.PASSWORD_RESET_TOKEN_SEND,
          'true'
        );
      })
      .catch((e) => {
        dispatch(passwordResetFailed(e.message));
      });
  };

export const confirmPasswordChange: AppThunk<Promise<any>> =
  (request: TPasswordUpdate) => (dispatch: AppDispatch) => {
    dispatch(passwordResetRequest());
    return changePassword(request)
      .then(() => {
        modify(
          StorageAction.remove,
          StorageActionKey.PASSWORD_RESET_TOKEN_SEND
        );
      })
      .catch((e) => {
        dispatch(passwordResetFailed(e.message));
      });
  };
