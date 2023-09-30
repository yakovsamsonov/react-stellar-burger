import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './reducers/ingredients';
import { burgerReducer } from './reducers/burger';
import { detailsReducer } from './reducers/details';
import { orderReducer } from './reducers/order';
import { userReducer } from './reducers/user';

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
  details: {
    detailsOpen: false,
    card: {},
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
  },
};

export function createStore(initialState = defaultInitialState) {
  return configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      burger: burgerReducer,
      details: detailsReducer,
      order: orderReducer,
      user: userReducer,
    },
    preloadedState: initialState,
  });
}
