import {   
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './constants';
import {ingredientsApi} from '../api';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  });
  return ingredientsApi()
  .then(data => {
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      allIngredients: data.data
    });
  })
  .catch(error => {
    dispatch({
      type: GET_INGREDIENTS_ERROR
    });
    console.log(error);
  });
};
