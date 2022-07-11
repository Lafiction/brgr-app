import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './burger-ingredients.js';
import {ingredientDetailsReducer} from './ingredient-details.js';
import {burgerConstructorReducer} from './burger-constructor.js';
import {orderDetailsReducer} from './order-details.js';

export const rootReducer = combineReducers({
  allIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer
});
