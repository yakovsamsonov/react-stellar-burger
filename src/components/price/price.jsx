import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceStyle from './price.module.css';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

export default function Price({ price, size = 'default' }) {
  const numberClasses = useMemo(() => {
    if (size === 'medium') {
      return PriceStyle.price__number_medium;
    } else {
      return PriceStyle.price__number_default;
    }
  }, []);

  return (
    <div className={PriceStyle.price__box}>
      <p className={numberClasses}>{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

Price.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.string,
};
