import IngredientIconStyle from './ingredient-icon.module.css';

export default function IngredientIcon({ order, image, label }) {
  return (
    <div
      key={order}
      className={IngredientIconStyle['ingredient-icon']}
      style={{
        position: 'relative',
        left: `-${order * 16}px`,
        zIndex: `${100 - order}`,
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
