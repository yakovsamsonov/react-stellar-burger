import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from '../actions/user';

const initialState = {
  user: { name: '', email: '' },
  registrationSend: false,
  registrationFailed: false,
  registrationErrorText: '',
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
    default: {
      return state;
    }
  }
};
