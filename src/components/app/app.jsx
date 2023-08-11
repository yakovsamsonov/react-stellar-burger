import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import Order from '../order/order.jsx';
import { useState, useEffect } from 'react';
import { BACKEND_BASE_URL } from '../constants/constants';
import { loadIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../utils/context';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    loadIngredients(BACKEND_BASE_URL)
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
      {!state.isLoading && !state.hasError && (
        <IngredientsContext.Provider value={state.data}>
          <Order />
        </IngredientsContext.Provider>
      )}
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
