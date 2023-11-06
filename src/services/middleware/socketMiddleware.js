export const socketMiddleware = (baseUrl, actions) => (store) => (next) => {
  let socket = null;
  return function (action) {
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

      socket.onerror = (event) => {
        dispatch({ type: action.wsOnError });
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
