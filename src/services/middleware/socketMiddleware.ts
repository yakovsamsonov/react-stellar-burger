import { Middleware } from 'redux';
import { RootState, TApplicationActions } from '../store';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../constants';

type TMiddlewareActions<K, T> = {
  wsOnConnectInit: K;
  [name: string]: T | K;
};

export const socketMiddleware =
  (
    baseUrl: string,
    actions: TMiddlewareActions<
      typeof WS_CONNECTION_START,
      | typeof WS_CONNECTION_CLOSED
      | typeof WS_CONNECTION_ERROR
      | typeof WS_CONNECTION_SUCCESS
      | typeof WS_GET_MESSAGE
    >
  ): Middleware<{}, RootState> =>
  (store) =>
  (next) => {
    let socket: WebSocket;
    return function (action: TApplicationActions) {
      const { dispatch } = store;

      if (action.type === actions.wsOnConnectInit) {
        socket = new WebSocket(`${baseUrl}${action.payload}`);
      }

      if (action.type === actions.wsOnClose) {
        socket.close(1000, 'leave page');
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: actions.wsOnConnectionSuccess });
        };

        socket.onerror = () => {
          dispatch({ type: actions.wsOnError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: actions.wsOnMessage, ordersHist: parsedData });
        };

        socket.onclose = (event) => {
          if (event.reason !== 'leave page') {
            dispatch({ type: actions.wsOnClose });
          }
        };
      }

      return next(action);
    };
  };
