import {   
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  SHOW_ORDER,
  CLOSE_ORDER
} from './constants';
import { orderBurgerApi } from '../api';
import { AppDispatch, AppThunk } from '../../services/hooks';
import { TOrderNumber } from '../../utils/types';

interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrderNumber;
}

interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_ERROR;
}

interface IShowOrder {
  readonly type: typeof SHOW_ORDER;
}

interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderNumberActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IShowOrder
  | ICloseOrder;

function getOrderRequest() {
  return {
    type: GET_ORDER_REQUEST
  }
}
function getOrderSuccess(res: Response) {
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

export const getOrderNumber: AppThunk = (orderData: string[]) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  return orderBurgerApi(orderData)
  .then(res => {
    dispatch(getOrderSuccess(res));
  })
  .catch(err => {
    dispatch(getOrderError());
    console.log(err);
  });
};
