import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import Order from "../order/order.jsx";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants/constants";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((d) => {
        setState({ ...state, data: d.data, isLoading: false });
      })
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {!state.isLoading && !state.hasError && <Order data={state.data} />}
      {state.isLoading && !state.hasError && (
        <p className={styles.warning}>Загрузка...</p>
      )}
      {!state.isLoading && state.hasError && (
        <p className={styles.warning}>Что-то пошло не так...</p>
      )}
    </div>
  );
}

export default App;
