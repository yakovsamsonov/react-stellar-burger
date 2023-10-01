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
  PASSWORD_RESET_TOKEN_SEND,
  PASSWORD_RESET_TOKEN_FAILED,
} from '../actions/user';

const initialState = {
  user: { email: '', name: '' },
  registrationSend: false,
  registrationFailed: false,
  registrationErrorText: '',
  loginSend: false,
  loginFailed: false,
  loginErrorText: '',
  logoutSend: false,
  logoutFailed: false,
  logoutErrorText: '',
  getUserSend: false,
  getUserFailed: false,
  getUserErrorText: '',
  resetRequested: false,
  resetTokenSend: false,
  resetFailed: false,
  resetErrorText: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registrationSend: true,
        registrationFailed: false,
        registrationErrorText: '',
        user: initialState.user,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registrationSend: false,
        registrationFailed: false,
        registrationErrorText: '',
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registrationSend: false,
        registrationFailed: true,
        registrationErrorText: action.errorMessage,
        user: initialState.user,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginSend: true,
        loginFailed: false,
        loginErrorText: '',
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginSend: false,
        loginFailed: false,
        loginErrorText: '',
        user: action.user,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginSend: false,
        loginFailed: true,
        loginErrorText: action.errorMessage,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutSend: true,
        logoutFailed: false,
        logoutErrorText: '',
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutSend: false,
        logoutFailed: false,
        logoutErrorText: '',
        user: initialState.user,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutSend: false,
        logoutFailed: true,
        logoutErrorText: action.errorMessage,
      };
    }
    case USER_REQUEST: {
      return {
        ...state,
        getUserSend: true,
        getUserFailed: false,
        getUserErrorText: '',
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        getUserSend: true,
        getUserFailed: false,
        getUserErrorText: '',
        user: action.user,
      };
    }
    case USER_FAILED: {
      return {
        ...state,
        getUserSend: true,
        getUserFailed: false,
        getUserErrorText: action.errorMessage,
        user: initialState.user,
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        resetRequested: true,
        resetFailed: false,
        resetTokenSend: false,
        resetErrorText: initialState.resetErrorText,
      };
    }
    case PASSWORD_RESET_TOKEN_SEND: {
      return {
        ...state,
        resetTokenSend: true,
      };
    }
    case PASSWORD_RESET_TOKEN_FAILED: {
      return {
        ...state,
        resetRequested: false,
        resetFailed: true,
        resetTokenSend: false,
        resetErrorText: action.errorMessage,
      };
    }
    default: {
      return state;
    }
  }
};
