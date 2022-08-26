import { TBurgerConstructorActions } from '../services/actions/burger-constructor';
import { TDetailsActions } from '../services/actions/get-details';
import { TIngredientsActions } from '../services/actions/get-ingredients';
import { TLoginActions } from '../services/actions/login';
import { TOrderNumberActions } from '../services/actions/get-order-number';
import { TRegistrationActions } from '../services/actions/registration';
import { TWsActions } from '../services/actions/websocket';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_USER_MESSAGE,
  WS_GET_ALL_MESSAGE,
} from '..services/actions/constants';

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
  payload: any;
  dragId: string;
};

export type TIngredients = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  readonly id?: string;
  readonly payload: TIngredient;
  readonly dragId: string;
  count?: string;
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
  | TIngredientsActions
  | TWsActions;

export type TOrders = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: object;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TAllOrders = {
  readonly orders: Array<TOrders>;
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
};

export type TWSAction = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_USER_MESSAGE | typeof WS_GET_ALL_MESSAGE;
};
