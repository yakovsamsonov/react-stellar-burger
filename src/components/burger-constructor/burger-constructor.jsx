import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { OPEN_ORDER, sendOrder } from '../../services/actions/order';
import { CLEAR_BURGER } from '../../services/actions/burger';
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
  BUN_TYPE,
} from '../../utils/constants';
import {
  REMOVE_BUN,
  ADD_BUN,
  ADD_REGULAR,
} from '../../services/actions/burger';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {
  const [buttonLabel, setButtonLabel] = useState(PLACE_ORDER_BUTTON_LABEL);

  const addIngredientToBurger = (el) => {
    const uuid = uuidv4();
    if (el.type === BUN_TYPE) {
      dispatch({ type: REMOVE_BUN });
      dispatch({ type: ADD_BUN, item: el, uuid: uuid });
    } else {
      dispatch({ type: ADD_REGULAR, item: el, uuid: uuid });
    }
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addIngredientToBurger(item.card);
    },
  });

  const { items } = useSelector((store) => store.burger);

  const total = useMemo(() => {
    return items.reduce((acc, el) => {
      return acc + el.data.price;
    }, 0);
  }, [items]);

  const burgerIds = items.map((el) => el.data._id);

  const dispatch = useDispatch();

  function processButtonClick() {
    if (items.length > 0) {
      setButtonLabel(AWAIT_BUTTON_LABEL);
      dispatch(sendOrder(burgerIds)).then(() => {
        dispatch({ type: OPEN_ORDER });
        dispatch({ type: CLEAR_BURGER });
        setButtonLabel(PLACE_ORDER_BUTTON_LABEL);
      });
    }
  }

  const borderStyle = isHover ? '1px solid red' : 'none';

  return (
    <section
      ref={dropTarget}
      className={BurgerConstructorStyle.section}
      style={{ border: borderStyle }}
    >
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
