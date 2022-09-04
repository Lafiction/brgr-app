import { orderDetailsReducer, initialState } from './order-details';
import type { TOrderNumberActions } from '../actions/get-order-number';
import * as types from '../actions/constants';

const order = {
  name: 'Elena',
  order: {
    number: 23607,
  },
  success: true,
};

describe('order details reducer', () => {
  it('should return the initial state', () => {
    expect(orderDetailsReducer(undefined, {} as TOrderNumberActions)).toEqual(
      initialState
    );
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it('should handle GET_ORDER_ERROR', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_ERROR,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
      order: null,
    });
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.GET_ORDER_SUCCESS,
        order: order,
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: false,
      order: order,
    });
  });

  it('should handle SHOW_ORDER', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.SHOW_ORDER,
      })
    ).toEqual({
      ...initialState,
      showOrderModal: true,
    });
  });

  it('should handle CLOSE_ORDER', () => {
    expect(
      orderDetailsReducer(initialState, {
        type: types.CLOSE_ORDER,
      })
    ).toEqual({
      ...initialState,
      showOrderModal: false,
      order: null,
    });
  });
});
