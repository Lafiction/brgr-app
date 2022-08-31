import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients';
import {ingredientDetailsReducer} from './ingredient-details';
import {burgerConstructorReducer} from './burger-constructor';
import {orderDetailsReducer} from './order-details';
import { registrationReducer } from './registration';
import { loginReducer } from './login';
import { logoutReducer } from './logout';
import { userReducer } from './user';
import { userUpdateReducer } from './user-update';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { wsReducer } from './websocket';
import { store } from '../store';

export const rootReducer = combineReducers({
  allIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  login: loginReducer,
  registration: registrationReducer,
  logout: logoutReducer,
  user: userReducer,
  updateUser: userUpdateReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ws: wsReducer,
});

export type TRootState = ReturnType<typeof store.getState>;
