import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  CLEAR_BURGER,
  OPEN_ORDER,
  sendOrder,
  REMOVE_BUN,
  ADD_BUN,
  ADD_REGULAR,
} from '../../services/actions';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  IngredientsGroup,
  BunIngredient,
} from '../ingredients-group/ingredients-group';
import BurgerConstructorStyle from './burger-constructor.module.css';
import {
  BOTTOM_ING_TYPE,
  TOP_ING_TYPE,
  AWAIT_BUTTON_LABEL,
  PLACE_ORDER_BUTTON_LABEL,
  BUN_TYPE,
} from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Price from '../price/price';

function BurgerConstructor() {
  const [buttonLabel, setButtonLabel] = useState(PLACE_ORDER_BUTTON_LABEL);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const { items, bun } = useSelector((store) => store.burger);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const total = useMemo(() => {
    const regular_price = items.reduce((acc, el) => {
      return acc + el.data.price;
    }, 0);
    const bun_price = bun ? 2 * bun.price : 0;
    return regular_price + bun_price;
  }, [items, bun]);

  const collectBurgerIds = () => {
    const burgerIds = items.map((el) => el.data._id);
    if (bun) {
      burgerIds.push(bun._id);
      burgerIds.splice(0, 0, bun._id);
    }
    return burgerIds;
  };

  useEffect(() => {
    if (bun) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [bun]);

  function processButtonClick() {
    if (!user.name) {
      navigate('/login');
      return;
    }
    if (bun) {
      setButtonLabel(AWAIT_BUTTON_LABEL);
      dispatch(sendOrder(collectBurgerIds())).then(() => {
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
      {bun && <BunIngredient ingredient={bun} type={TOP_ING_TYPE} />}
      {items.length > 0 && <IngredientsGroup />}
      {bun && <BunIngredient ingredient={bun} type={BOTTOM_ING_TYPE} />}
      <div className={BurgerConstructorStyle['summary']}>
        <Price price={total} size="medium"></Price>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={isButtonDisabled}
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
