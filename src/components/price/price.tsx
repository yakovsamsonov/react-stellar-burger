import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceStyle from './price.module.css';
import { FC, useMemo } from 'react';

type TPrice = {
  price: number | string;
  size?: 'default' | 'medium';
};

export const Price: FC<TPrice> = ({ price, size = 'default' }) => {
  const numberClasses = useMemo<string>(() => {
    if (size === 'medium') {
      return PriceStyle.price__number_medium;
    } else if (size === 'default') {
      return PriceStyle.price__number_default;
    } else {
      return '';
    }
  }, [size]);

  return (
    <div className={PriceStyle.price__box}>
      <p className={numberClasses}>{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};
