import { useSelector } from 'react-redux';
import { FC } from 'react';
import SectionStyle from './section.module.css';
import { Card } from '../card/card';
import { TIngredient, TBurgerType } from '../../utils';
import { ingredients as ingredientsSelector } from '../../services/selectors/selectors';

type TSection = {
  label: string;
  type: TBurgerType;
}

export const Section: FC<TSection> = ({ label, type }) => {
  const { ingredients } = useSelector(ingredientsSelector);

  const data: ReadonlyArray<TIngredient> = ingredients.filter((el: TIngredient) => el.type === type);

  return (
    <>
      <h3 className={SectionStyle['card__group-label']} id={type}>
        {label}
      </h3>
      <ul className={SectionStyle.card__group}>
        {data.map((card: TIngredient) => (
          <Card
            key={card._id}
            type={card.type}
            id={card._id}
            name={card.name}
            image={card.image}
            price={card.price}
          />
        ))}
      </ul>
    </>
  );
}
