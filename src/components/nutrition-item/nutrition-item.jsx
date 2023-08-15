import PropTypes from 'prop-types';
import NutritionItemStyle from './nutrition-item.module.css';

export default function NutritionItem({ label, value }) {
  return (
    <li className={NutritionItemStyle['nutrition__item']}>
      <p className={NutritionItemStyle['nutrition__item-label']}>{label}</p>
      <p className={NutritionItemStyle['nutrition__item-value']}>{value}</p>
    </li>
  );
}

NutritionItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
