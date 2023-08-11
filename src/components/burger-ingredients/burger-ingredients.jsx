import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Section from '../section/section';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import { BUN_TYPE, MAIN_TYPE, SAUCE_TYPE } from '../constants/constants.jsx';
import { burgerIngredientPropType } from '../../utils/prop-types.js';

function BurgerIngredients(props) {
  const [activeTab, setActiveTab] = useState(BUN_TYPE);

  function changeTab(value) {
    setActiveTab(value);
    const targetBlock = document.getElementById(value);
    if (targetBlock) {
      targetBlock.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  return (
    <section className={BurgerIngredientsStyle.section}>
      <h2 className={BurgerIngredientsStyle['section__label']}>
        Соберите бургер
      </h2>
      <div className={BurgerIngredientsStyle['tabs']}>
        <Tab
          value={BUN_TYPE}
          active={activeTab === BUN_TYPE}
          onClick={changeTab}
        >
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
      <div
        className="custom-scroll"
        style={{
          overflowY: 'scroll',
        }}
      >
        <Section id={BUN_TYPE} label="Булки" />
        <Section id={SAUCE_TYPE} label="Соусы" />
        <Section id={MAIN_TYPE} label="Начинки" />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = burgerIngredientPropType;

export default BurgerIngredients;
