import { wsReducer, initialState } from './websocket';
import { TOrders } from '../../utils/types';
import * as types from '../actions/constants';

const orders: TOrders[] = [
  {
    _id: '6308fd3c42d34a001c283ea1',
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cc'],
    status: 'done',
    name: 'Space флюоресцентный spicy бургер',
    createdAt: '2022-08-26T17:05:00.251Z',
    updatedAt: '2022-08-26T17:05:00.649Z',
    number: 23869,
  },
  {
    _id: '631489a042d34a001c285a89',
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cb'],
    status: 'done',
    name: 'Био-марсианский флюоресцентный бургер',
    createdAt: '2022-09-04T11:18:56.894Z',
    updatedAt: '2022-09-04T11:18:57.185Z',
    number: 24598,
  },
];

describe('websocket reducer', () => {
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_ERROR,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });

    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: orders,
          total: 1000,
          totalToday: 10,
        },
        {
          type: types.WS_CONNECTION_ERROR,
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: orders,
      total: 1000,
      totalToday: 10,
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });

    expect(
      wsReducer(
        {
          wsConnected: true,
          orders: orders,
          total: 1000,
          totalToday: 10,
        },
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: orders,
      total: 1000,
      totalToday: 10,
    });
  });

  it('should handle WS_GET_USER_MESSAGE', () => {
    expect(
      wsReducer(
        { orders: null },
        {
          type: types.WS_GET_USER_MESSAGE,
          payload: {
            orders: orders,
          },
        }
      )
    ).toEqual({
      orders: orders,
    });

    expect(
      wsReducer(
        {
          orders: orders,
        },
        {
          type: types.WS_GET_USER_MESSAGE,
          payload: {
            orders: orders,
          },
        }
      )
    ).toEqual({
      orders: orders,
    });
  });

  it('should handle WS_GET_ALL_MESSAGE', () => {
    expect(
      wsReducer(
        { orders: null, total: null, totalToday: null },
        {
          type: types.WS_GET_ALL_MESSAGE,
          payload: {
            orders: orders,
            total: 1000,
            totalToday: 10,
          },
        }
      )
    ).toEqual({
      orders: orders,
      total: 1000,
      totalToday: 10,
    });
  });
});
