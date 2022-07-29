import {   
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './constants';
import { ingredientsApi } from '../api';

function getIngredientsRequest() {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}
function getIngredientsSuccess(data) {
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

export const getIngredients = () => (dispatch) => {
  dispatch(getIngredientsRequest);
  return ingredientsApi()
  .then(data => {
    dispatch(getIngredientsSuccess(data));
  })
  .catch(error => {
    dispatch(getIngredientsError());
    console.log(error);
  });
};
