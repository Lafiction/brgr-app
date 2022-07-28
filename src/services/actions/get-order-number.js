import {   
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR
} from './constants';
import { orderBurgerApi } from '../api';

function getOrderRequest() {
  return {
    type: GET_ORDER_REQUEST
  }
}
function getOrderSuccess(res) {
  return {
    type: GET_ORDER_SUCCESS,
    order: res
  }
}
function getOrderError() {
  return {
    type: GET_ORDER_ERROR
  }
}

export const getOrderNumber = (orderData) => (dispatch) => {
  dispatch(getOrderRequest);
  return orderBurgerApi(orderData)
  .then(res => {
    dispatch(getOrderSuccess(res));
  })
  .catch(err => {
    dispatch(getOrderError);
    console.log(err);
  });
};
