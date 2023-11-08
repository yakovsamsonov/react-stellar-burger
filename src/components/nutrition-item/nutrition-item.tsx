import { FC } from 'react';
import NutritionItemStyle from './nutrition-item.module.css';

type TNutritionItem = {
  label: string;
  value: number;
};

export const NutritionItem: FC<TNutritionItem> = ({ label, value }) => {
  return (
    <li className={NutritionItemStyle['nutrition__item']}>
      <p className={NutritionItemStyle['nutrition__item-label']}>{label}</p>
      <p className={NutritionItemStyle['nutrition__item-value']}>{value}</p>
    </li>
  );
};
