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
} from '../actions/user';

const initialState = {
  user: { name: '', email: '' },
  registrationSend: false,
  registrationFailed: false,
  registrationErrorText: '',
  loginSend: false,
  loginFailed: false,
  loginErrorText: '',
  logoutSend: false,
  logoutFailed: false,
  logoutErrorText: '',
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
        user: action.user,
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
        user: initialState.user,
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
        user: initialState.user,
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
    default: {
      return state;
    }
  }
};
