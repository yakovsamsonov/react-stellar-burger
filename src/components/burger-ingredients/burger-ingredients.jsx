import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Section from '../section/section';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE } from '../constants/constants.jsx';

function BurgerIngredients() {
  const [activeTab, setActiveTab] = useState(BUN_TYPE);

  const changeTab = (value) => {
    const targetBlock = document.getElementById(value);
    if (targetBlock) {
      targetBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (e) => {
    const basePositon =
      e.target.previousElementSibling.getBoundingClientRect().bottom;
    const targetTab = calculateNearestSection(basePositon).type;
    setActiveTab(targetTab);
  };

  const calculateNearestSection = (basePositon) => {
    const bunContainer = document.getElementById(BUN_TYPE);
    const mainContainer = document.getElementById(MAIN_TYPE);
    const sauceContainer = document.getElementById(SAUCE_TYPE);
    return [bunContainer, mainContainer, sauceContainer].reduce(
      (nearestSection, el) => {
        const elPosition = Math.abs(
          basePositon - el.getBoundingClientRect().top
        );
        if (nearestSection.position <= elPosition) {
          return nearestSection;
        } else {
          return { type: el.id, position: elPosition };
        }
      },
      {
        type: BUN_TYPE,
        position: Math.abs(
          basePositon - bunContainer.getBoundingClientRect().top
        ),
      }
    );
  };

  return (
    <section className={BurgerIngredientsStyle.section}>
      <h2 className={BurgerIngredientsStyle['section__label']}>
        Соберите бургер
      </h2>
      <BurgerIngredientsTab activeTab={activeTab} changeTab={changeTab} />
      <div
        className="custom-scroll"
        style={{
          overflowY: 'scroll',
        }}
        onScroll={(e) => handleScroll(e)}
      >
        <Section id={BUN_TYPE} label="Булки" />
        <Section id={SAUCE_TYPE} label="Соусы" />
        <Section id={MAIN_TYPE} label="Начинки" />
      </div>
    </section>
  );
}

function BurgerIngredientsTab({ activeTab, changeTab }) {
  return (
    <div className={BurgerIngredientsStyle['tabs']}>
      <Tab value={BUN_TYPE} active={activeTab === BUN_TYPE} onClick={changeTab}>
        <p className={BurgerIngredientsStyle['tab__label']}>Булки</p>
      </Tab>
      <Tab
        value={SAUCE_TYPE}
        active={activeTab === SAUCE_TYPE}
        onClick={changeTab}
      >
        <p className={BurgerIngredientsStyle['tab__label']}>Соусы</p>
      </Tab>
      <Tab
        value={MAIN_TYPE}
        active={activeTab === MAIN_TYPE}
        onClick={changeTab}
      >
        <p className={BurgerIngredientsStyle['tab__label']}>Начинки</p>
      </Tab>
    </div>
  );
}

export default BurgerIngredients;
