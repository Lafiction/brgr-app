import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ALL_MESSAGE, 
  WS_GET_USER_MESSAGE
} from '../actions/constants';
import { TWsActions } from '../actions/websocket';
import { TOrders } from '../../utils/types';
  
type TWsState = {
  wsConnected?: Boolean;
  orders: Array<TOrders> | null;
  total?: number | null;
  totalToday?: number | null;
};
  
export const initialState: TWsState = {
  wsConnected: false,
  orders: null,
  total: null,
  totalToday: null,
};
  
export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ALL_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_GET_USER_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};
