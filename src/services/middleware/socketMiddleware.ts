export const socketMiddleware =
  (baseUrl: string, actions: any) => (store: any) => (next: any) => {
    let socket: WebSocket;
    return function (action: any) {
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
