import {
  configureStore,
  ActionCreator,
  ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';
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
import {
  TBurgerActions,
  TIngredientsActions,
  TOrderActions,
  TOrderDetailsActions,
  TUserActions,
  TWsConnActions,
} from './actions';

const WS_ACTIONS = {
  wsOnConnectInit: WS_CONNECTION_START,
  wsOnError: WS_CONNECTION_ERROR,
  wsOnConnectionSuccess: WS_CONNECTION_SUCCESS,
  wsOnClose: WS_CONNECTION_CLOSED,
  wsOnMessage: WS_GET_MESSAGE,
};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  details: detailsReducer,
  user: userReducer,
  ws: wsReducer,
});

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware(WS_BASE_URL, WS_ACTIONS)),
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TIngredientsActions
  | TBurgerActions
  | TOrderActions
  | TOrderDetailsActions
  | TUserActions
  | TWsConnActions;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, undefined, TApplicationActions>
>;
