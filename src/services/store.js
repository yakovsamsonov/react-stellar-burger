import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware';
import {
  wsReducer,
  ingredientsReducer,
  burgerReducer,
  orderReducer,
  userReducer,
  detailsReducer,
} from './reducers';
import { WS_BASE_URL } from '../utils/constants';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './constants';

const WS_ACTIONS = {
  wsOnConnectInit: WS_CONNECTION_START,
  wsOnError: WS_CONNECTION_ERROR,
  wsOnConnectionSuccess: WS_CONNECTION_SUCCESS,
  wsOnClose: WS_CONNECTION_CLOSED,
  wsOnMessage: WS_GET_MESSAGE,
};

const defaultInitialState = {
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
  details: {
    detailsData: {},
    detailsLoading: false,
    detailsFailed: false,
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
      details: detailsReducer,
      user: userReducer,
      ws: wsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware(WS_BASE_URL, WS_ACTIONS)),
    preloadedState: initialState,
  });
}
