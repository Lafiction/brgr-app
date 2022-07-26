import {   
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR
} from './constants';
import { orderBurgerApi } from '../api';

export const getOrderNumber = (orderData) => (dispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST
  });
  return orderBurgerApi(orderData)
  .then(res => {
    dispatch({
      type: GET_ORDER_SUCCESS,
      order: res
    });
  })
  .catch(err => {
    dispatch({
      type: GET_ORDER_ERROR
    });
    console.log(err);
  });
};
