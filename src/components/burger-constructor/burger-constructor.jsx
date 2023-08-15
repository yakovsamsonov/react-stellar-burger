import { useContext, useState } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import BurgerConstructorStyle from './burger-constructor.module.css';
import {
  BOTTOM_ING_TYPE,
  REGULAR_ING_TYPE,
  TOP_ING_TYPE,
} from '../constants/constants';
import { burgerConstructorPropType } from '../../utils/prop-types.js';
import { OrderContext } from '../../utils/context';

function BurgerConstructor() {
  const {
    order,
    openModal: openOrderConfirmation,
    setVisible,
  } = useContext(OrderContext);
  const [buttonLabel, setButtonLabel] = useState('Оформить заказ');

  function processButtonClick() {
    setButtonLabel('...');
    openOrderConfirmation().then(() => {
      setVisible(true);
      setButtonLabel('Оформить заказ');
    });
  }

  return (
    <section className={BurgerConstructorStyle.section}>
      <IngredientsGroup groupType={TOP_ING_TYPE} />
      <IngredientsGroup groupType={REGULAR_ING_TYPE} />
      <IngredientsGroup groupType={BOTTOM_ING_TYPE} />
      <div className={BurgerConstructorStyle['summary']}>
        <p className={BurgerConstructorStyle['summary__total-value']}>
          {order.total}
        </p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass={BurgerConstructorStyle['summary__order-button']}
          onClick={processButtonClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = burgerConstructorPropType;

export default BurgerConstructor;
