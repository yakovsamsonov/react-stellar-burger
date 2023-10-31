import { FC, UIEvent, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Section } from '../section/section';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import { TBurgerType, SectionType } from '../../utils';

type TBurgerTab = {
  activeTab: TBurgerType;
  changeTab: (name: string) => void;
};

type TSectionDescription = {
  type: TBurgerType;
  position: number;
};

export const BurgerIngredients: FC = () => {
  const [activeTab, setActiveTab] = useState<TBurgerType>(SectionType.bun);

  const changeTab = (value: string): void => {
    const targetBlock = document.getElementById(value);
    if (targetBlock) {
      targetBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (
    event: UIEvent<HTMLDivElement, globalThis.UIEvent>
  ): void => {
    const basePositon: number | undefined = (
      event?.target as HTMLElement
    )?.previousElementSibling?.getBoundingClientRect().bottom;
    if (basePositon) {
      const targetTab: TBurgerType = calculateNearestSection(basePositon).type;
      setActiveTab(targetTab);
    }
  };

  const calculateNearestSection = (
    basePositon: number
  ): TSectionDescription => {
    const bunContainer: HTMLElement | null = document.getElementById(
      SectionType.bun
    );
    const mainContainer: HTMLElement | null = document.getElementById(
      SectionType.main
    );
    const sauceContainer: HTMLElement | null = document.getElementById(
      SectionType.sauce
    );

    const containers: Array<HTMLElement | null> = [
      bunContainer,
      mainContainer,
      sauceContainer,
    ];

    return containers.reduce(
      (nearestSection: TSectionDescription, el): TSectionDescription => {
        const elPosition: number | undefined = el?.getBoundingClientRect()?.top
          ? basePositon - el?.getBoundingClientRect()?.top
          : undefined;
        if (!elPosition || nearestSection.position <= Math.abs(elPosition)) {
          return nearestSection;
        } else {
          return { type: el?.id as TBurgerType, position: elPosition };
        }
      },
      {
        type: SectionType.bun,
        position: Math.abs(
          basePositon -
            (bunContainer
              ? bunContainer.getBoundingClientRect().top
              : basePositon)
        ),
      } as TSectionDescription
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
        onScroll={(e: UIEvent<HTMLDivElement, globalThis.UIEvent>): void =>
          handleScroll(e)
        }
      >
        <Section type={SectionType.bun} label="Булки" />
        <Section type={SectionType.sauce} label="Соусы" />
        <Section type={SectionType.main} label="Начинки" />
      </div>
    </section>
  );
};

const BurgerIngredientsTab: FC<TBurgerTab> = ({ activeTab, changeTab }) => {
  return (
    <div className={BurgerIngredientsStyle['tabs']}>
      <Tab
        value={SectionType.bun}
        active={activeTab === SectionType.bun}
        onClick={changeTab}
      >
        <p className={BurgerIngredientsStyle['tab__label']}>Булки</p>
      </Tab>
      <Tab
        value={SectionType.sauce}
        active={activeTab === SectionType.sauce}
        onClick={changeTab}
      >
        <p className={BurgerIngredientsStyle['tab__label']}>Соусы</p>
      </Tab>
      <Tab
        value={SectionType.main}
        active={activeTab === SectionType.main}
        onClick={changeTab}
      >
        <p className={BurgerIngredientsStyle['tab__label']}>Начинки</p>
      </Tab>
    </div>
  );
};
