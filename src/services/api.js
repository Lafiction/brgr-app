import {   
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,

  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR
} from './actions/constants';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(response => {
      if (!response && !response.success) {
        throw new Error('Something went wrong');
      }
      return response.json();
    })
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
}

export function getOrderNumber(arr) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: arr})
    })
    .then(response => {
      if (!response && !response.success) {
        throw new Error('Something went wrong');
      }
      return response.json();
    })
    .then(data => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        order: data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ORDER_ERROR
      });
      console.log(error);
    });
  };
}
