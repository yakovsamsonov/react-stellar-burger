import IngredientIconStyle from './ingredient-icon.module.css';
import PropTypes from 'prop-types';

export default function IngredientIcon({ order, image, label }) {
  return (
    <div
      key={order}
      className={IngredientIconStyle['ingredient-icon']}
      style={{
        position: 'relative',
        left: `-${order * 16}px`,
        zIndex: `${10 - order}`,
      }}
    >
      {label ? (
        <p className={IngredientIconStyle['ingredient-icon__label']}>{label}</p>
      ) : (
        <></>
      )}
      <img
        className={IngredientIconStyle['ingredient-icon__picture']}
        alt=""
        src={image}
      />
    </div>
  );
}

IngredientIcon.propTypes = {
  order: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  label: PropTypes.string,
};
