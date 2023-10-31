export type TIngredient = {
  _id: string;
  name: string;
  type: TBurgerType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TBurgerType = 'bun' | 'sauce' | 'main';

export type TOrderIngredient = TIngredient & {
  count: number
}

export type TOrder = {
  status: keyof typeof OrderStateSingle;
  ingredients: Array<string>;
  name: string;
  createdAt: string;
  number: string;
  _id: string;
}

export enum OrderStateSingle  {
  done = 'Выполнен',
  pending = 'Готовится',
  created = 'Создан',
};
export enum OrderStatePlural  {
  done = 'Готовы',
  pending = 'В работе',
  created = 'Обработка',
}
export enum SectionType {
  bun ='bun',
  sauce = 'sauce',
  main = 'main'
}
export enum PositionType {
  top ='top',
  bottom = 'bottom',
  regular = 'regular'
}

export enum NavigationLabel {
  burger = "Конструктор",
  list = "Лента заказов",
  profile = "Личный кабинет"
}