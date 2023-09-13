import styles from '../components/app/app.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import CardDetails from '../components/card-details/card-details';
import OrderDetails from '../components/order-details/order-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../services/actions/ingredients';

export function Constructor() {
  const { ingredientsLoading, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  const { detailsOpen } = useSelector((store) => store.details);
  const { orderOpen } = useSelector((store) => store.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {ingredientsLoading ? (
        <p className={styles.warning}>Загрузка...</p>
      ) : ingredientsFailed ? (
        <p className={styles.warning}>Что-то пошло не так...</p>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className={styles.order}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      )}
      {detailsOpen && <CardDetails></CardDetails>}
      {orderOpen && <OrderDetails></OrderDetails>}
    </>
  );
}
