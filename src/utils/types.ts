export type TIngredient = {
  type: 'bun' | 'sauce' | 'main';
  _id: string;
  _v: number;
  name: string;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};

export type TIngredientDetails = {
  name: string;
  image_large: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};

export type TOrderNumber = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TProfileMenu = {
  activeLink: string;
};

export type TLocation = {
  main: {
    pathname: string;
    state: {};
    search: string;
    hash: string;
  };
};

export type TModal = {
  header?: string;
  onClose: () => void;
  children?: any;
};
