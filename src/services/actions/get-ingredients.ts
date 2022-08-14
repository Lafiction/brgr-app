import {   
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './constants';
import { ingredientsApi } from '../api';
import { TIngredient } from '../../utils/types';
import { AppDispatch } from '../hooks';

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly allIngredients: Array<TIngredient>;
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

function getIngredientsRequest() {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}
function getIngredientsSuccess(data: any) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    allIngredients: data.data
  }
}
function getIngredientsError() {
  return {
    type: GET_INGREDIENTS_ERROR
  }
}

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest);
  return ingredientsApi()
  .then((data: any) => {
    dispatch(getIngredientsSuccess(data));
  })
  .catch(error => {
    dispatch(getIngredientsError());
    console.log(error);
  });
};
