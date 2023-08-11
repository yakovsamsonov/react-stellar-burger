import { useContext } from 'react';
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
    items,
    total,
    openModal: openOrderConfirmation,
  } = useContext(OrderContext);

  function filterBurgerComponent(type) {
    return items.filter((el) => el.type === type);
  }

  return (
    <section className={BurgerConstructorStyle.section}>
      <IngredientsGroup
        groupType={TOP_ING_TYPE}
        content={filterBurgerComponent(TOP_ING_TYPE)}
      />
      <IngredientsGroup
        groupType={REGULAR_ING_TYPE}
        content={filterBurgerComponent(REGULAR_ING_TYPE)}
      />
      <IngredientsGroup
        groupType={BOTTOM_ING_TYPE}
        content={filterBurgerComponent(BOTTOM_ING_TYPE)}
      />
      <div className={BurgerConstructorStyle['summary']}>
        <p className={BurgerConstructorStyle['summary__total-value']}>
          {total}
        </p>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={openOrderConfirmation}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = burgerConstructorPropType;

export default BurgerConstructor;
