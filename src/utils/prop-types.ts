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
