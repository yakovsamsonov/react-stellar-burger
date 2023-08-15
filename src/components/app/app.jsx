import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import Order from '../order/order.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const { ingredientsLoading, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredientsLoading ? (
        <p className={styles.warning}>Загрузка...</p>
      ) : ingredientsFailed ? (
        <p className={styles.warning}>Что-то пошло не так...</p>
      ) : (
        <Order />
      )}
    </div>
  );
}

export default App;
