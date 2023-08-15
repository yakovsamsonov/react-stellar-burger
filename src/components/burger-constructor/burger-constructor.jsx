import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_ORDER, sendOrder } from '../../services/actions/order';
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
  AWAIT_BUTTON_LABEL,
  PLACE_ORDER_BUTTON_LABEL,
} from '../constants/constants';

function BurgerConstructor() {
  const [buttonLabel, setButtonLabel] = useState(PLACE_ORDER_BUTTON_LABEL);

  const { total, items } = useSelector((store) => store.burger);

  const burgerIds = items.map((el) => el.data._id);

  const dispatch = useDispatch();

  function processButtonClick() {
    if (items.length > 0) {
      setButtonLabel(AWAIT_BUTTON_LABEL);
      dispatch(sendOrder(burgerIds)).then(() => {
        dispatch({ type: OPEN_ORDER });
        setButtonLabel(PLACE_ORDER_BUTTON_LABEL);
      });
    }
  }

  return (
    <section className={BurgerConstructorStyle.section}>
      <IngredientsGroup groupType={TOP_ING_TYPE} />
      <IngredientsGroup groupType={REGULAR_ING_TYPE} />
      <IngredientsGroup groupType={BOTTOM_ING_TYPE} />
      <div className={BurgerConstructorStyle['summary']}>
        <p className={BurgerConstructorStyle['summary__total-value']}>
          {total}
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

export default BurgerConstructor;
