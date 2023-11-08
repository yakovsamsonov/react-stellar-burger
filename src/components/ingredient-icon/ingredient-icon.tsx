import IngredientIconStyle from './ingredient-icon.module.css';
import { FC } from 'react';

type TIngredientIcon = {
  order: number;
  image: string;
  label?: string;
};

export const IngredientIcon: FC<TIngredientIcon> = ({
  order,
  image,
  label,
}) => {
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
};
