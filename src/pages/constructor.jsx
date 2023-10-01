import styles from '../components/app/app.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import OrderDetails from '../components/order-details/order-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

export function Constructor() {
  const { orderOpen } = useSelector((store) => store.order);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.order}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
      {orderOpen && <OrderDetails></OrderDetails>}
    </>
  );
}
