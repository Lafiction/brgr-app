import { TBurgerConstructorActions } from '../services/actions/burger-constructor';
import { TDetailsActions } from '../services/actions/get-details';
import { TIngredientsActions } from '../services/actions/get-ingredients';
import { TLoginActions } from '../services/actions/login';
import { TOrderNumberActions } from '../services/actions/get-order-number';
import { TRegistrationActions } from '../services/actions/registration';

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

export type TUpdateUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TRegistrationForm = TLoginForm & {
  name: string;
};

export type TAppActions =
  | TRegistrationActions
  | TLoginActions
  | TOrderNumberActions
  | TBurgerConstructorActions
  | TDetailsActions
  | TIngredientsActions;
