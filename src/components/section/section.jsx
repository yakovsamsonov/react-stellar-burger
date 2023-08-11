import Card from '../card/card';
import SectionStyle from './section.module.css';
import { sectionPropType } from '../../utils/prop-types.js';

function Section(props) {
  const { label, data, id } = props;

  return (
    <div>
      <h3 className={SectionStyle['card__group-label']} id={id}>
        {label}
      </h3>
      <ul className={SectionStyle.card__group}>
        {data.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </ul>
    </div>
  );
}

Section.propTypes = sectionPropType;

export default Section;
