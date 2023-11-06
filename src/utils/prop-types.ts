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
};

export type TBurgerType = keyof typeof SectionType;

export type TOrderIngredient = TIngredient & {
  count: number;
};

export type TBurgerIngredient = {
  uuid: string;
  data: TIngredient;
};

export type TOrder = {
  status: keyof typeof OrderStateSingle;
  ingredients: Array<string>;
  name: string;
  createdAt: string;
  number: string;
  _id: string;
};

export type TOrdersHistory = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export enum OrderStateSingle {
  done = 'Выполнен',
  pending = 'Готовится',
  created = 'Создан',
}
export enum OrderStatePlural {
  done = 'Готовы',
  pending = 'В работе',
  created = 'Обработка',
}
export enum SectionType {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main',
}
export enum PositionType {
  top = 'top',
  bottom = 'bottom',
  regular = 'regular',
}

export enum NavigationLabel {
  burger = 'Конструктор',
  list = 'Лента заказов',
  profile = 'Личный кабинет',
}

export enum SubmitOrderButtonLabel {
  await = '...',
  ready = 'Оформить заказ',
}

export enum Cookies {
  access = 'accessToken',
  refresh = 'refreshToken',
}

export enum StorageAction {
  add = 'add',
  get = 'get',
  remove = 'remove',
}

export enum StorageActionKey {
  PASSWORD_RESET_TOKEN_SEND = 'PASSWORD_RESET_TOKEN_SEND',
}

export enum FieldType {
  email = 'email',
  password = 'password',
  text = 'text',
}

export type TField = {
  type: keyof typeof FieldType;
  name: string;
  value: string;
  icon?: any;
  placeholder?: string;
};

export type TLink = {
  text: string;
  linkText: string;
  linkTo: string;
};

export type TButton = {
  label: string;
  type: 'button' | 'submit' | 'reset';
};

export type TPassword = {
  password: string;
};

export type TEmail = {
  email: string;
};

export type TUserWithPassword = TEmail & TPassword;

export type TPasswordUpdate = TPassword & {
  token: string;
};

export type TNewUser = TUserWithPassword & {
  name: string;
};

export type TUser = Omit<TNewUser, 'password'>;
