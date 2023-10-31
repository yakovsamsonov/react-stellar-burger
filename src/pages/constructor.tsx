import styles from '../components/app/app.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { OrderConfirmation } from '../components/order-confirmation/order-confirmation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { order as orderSelector } from '../services/selectors/selectors';

export const Constructor: FC = () => {
  const { orderOpen, number } = useSelector(orderSelector);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.order}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
      {orderOpen && <OrderConfirmation orderNumber={number} />}
    </>
  );
};
