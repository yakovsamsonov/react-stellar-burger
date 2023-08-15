import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SectionStyle from './section.module.css';
import Card from '../card/card';

function Section(props) {
  const { label, id } = props;

  const { ingredients } = useSelector((store) => store.ingredients);

  const data = ingredients.filter((el) => el.type === id);

  return (
    <>
      <h3 className={SectionStyle['card__group-label']} id={id}>
        {label}
      </h3>
      <ul className={SectionStyle.card__group}>
        {data.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </ul>
    </>
  );
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Section;
