import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients.js';
import {ingredientDetailsReducer} from './ingredient-details.js';
import {burgerConstructorReducer} from './burger-constructor.js';
import {orderDetailsReducer} from './order-details.js';

import { registrationReducer } from './registration';
import { loginReducer } from './login';
import { logoutReducer } from './logout';
import { userReducer } from './user';
import { userUpdateReducer } from './userUpdate';
import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';

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
});
