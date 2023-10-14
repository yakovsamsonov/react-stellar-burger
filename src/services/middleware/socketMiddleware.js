import { WS_BASE_URL } from '../../utils/constants';
import { getAccessToken } from '../../utils/cookie';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions';

export const socketMiddleware = (store) => {
  return function (next) {
    let socket = null;
    return function (action) {
      const { dispatch } = store;

      if (action.type === WS_CONNECTION_START) {
        if (action.private) {
          socket = new WebSocket(`${WS_BASE_URL}?token=${getAccessToken()}`);
        } else {
          socket = new WebSocket(`${WS_BASE_URL}/all`);
        }
      }

      if (action.type === WS_CONNECTION_CLOSED) {
        socket.close(1000, 'leave page');
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = (event) => {
          if (event.reason !== 'leave page') {
            dispatch({ type: WS_CONNECTION_CLOSED });
          }
        };
      }

      return next(action);
    };
  };
};
