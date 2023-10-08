import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware';
import {
  wsReducer,
  ingredientsReducer,
  burgerReducer,
  orderReducer,
  userReducer,
} from './reducers';

export const defaultInitialState = {
  ingredients: {
    ingredients: [],
    ingredientsLoading: false,
    ingredientsFailed: false,
  },
  burger: {
    bun: null,
    items: [],
  },
  order: {
    orderOpen: false,
    ingredients: [],
    number: 0,
    orderLoading: false,
    orderFailed: false,
  },
  user: {
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
    resetFailed: false,
    resetErrorText: '',
  },
  ws: {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export function createStore(initialState = defaultInitialState) {
  return configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      burger: burgerReducer,
      order: orderReducer,
      user: userReducer,
      ws: wsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
    preloadedState: initialState,
  });
}
