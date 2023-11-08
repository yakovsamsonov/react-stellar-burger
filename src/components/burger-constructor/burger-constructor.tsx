import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  clearBurger,
  openOrder,
  sendOrder,
  addIngredient,
} from '../../services/actions';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  IngredientsGroup,
  BunIngredient,
} from '../ingredients-group/ingredients-group';
import BurgerConstructorStyle from './burger-constructor.module.css';
import { PositionType, SubmitOrderButtonLabel } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Price } from '../price/price';
import {
  burger,
  user as userSelector,
  ingredients as ingredientsSelector,
} from '../../services/selectors/selectors';
import { useAppDispatch } from '../../services/hooks';

export function BurgerConstructor() {
  const [buttonLabel, setButtonLabel] = useState<SubmitOrderButtonLabel>(
    SubmitOrderButtonLabel.ready
  );
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
  const { items, bun } = useSelector(burger);
  const { user } = useSelector(userSelector);
  const { ingredients } = useSelector(ingredientsSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addIngredientToBurger = (ingredientId: string): void => {
    const uuid = uuidv4();
    const ing = ingredients.find((el) => el._id === ingredientId);
    if (ing) {
      dispatch(addIngredient(uuid, ing));
    }
  };

  const [{ isHover }, dropTarget] = useDrop<
    { id: string },
    unknown,
    { isHover: boolean }
  >({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addIngredientToBurger(item.id);
    },
  });

  const total = useMemo((): number => {
    const regular_price = items.reduce((acc, el) => {
      return acc + el.data.price;
    }, 0);
    const bun_price = bun ? 2 * bun.price : 0;
    return regular_price + bun_price;
  }, [items, bun]);

  const collectBurgerIds = useCallback((): Array<string> => {
    const burgerIds = items.map((el) => el.data._id);
    if (bun) {
      burgerIds.push(bun._id);
      burgerIds.splice(0, 0, bun._id);
    }
    return burgerIds;
  }, [items, bun]);

  useEffect(() => {
    if (bun) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [bun]);

  const processButtonClick = useCallback((): void => {
    if (!user.name) {
      navigate('/login');
      return;
    }
    if (bun) {
      setButtonLabel(SubmitOrderButtonLabel.await);
      dispatch(sendOrder(collectBurgerIds())).then(() => {
        dispatch(openOrder());
        dispatch(clearBurger());
        setButtonLabel(SubmitOrderButtonLabel.ready);
      });
    }
  }, [bun, collectBurgerIds, dispatch, setButtonLabel, navigate, user.name]);

  const borderStyle = isHover ? '1px solid red' : 'none';

  return (
    <section
      ref={dropTarget}
      className={BurgerConstructorStyle.section}
      style={{ border: borderStyle }}
    >
      {bun && <BunIngredient ingredient={bun} type={PositionType.top} />}
      {items.length > 0 && <IngredientsGroup />}
      {bun && <BunIngredient ingredient={bun} type={PositionType.bottom} />}
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
