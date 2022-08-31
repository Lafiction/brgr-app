import { 
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  SHOW_ORDER,
  CLOSE_ORDER,
} from '../actions/constants';

import type { TOrderNumberActions } from '../actions/get-order-number';
import { TOrderNumber } from '../../utils/types';

type TDetailsState = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: TOrderNumber | null;
  showOrderModal: boolean;
};

export const initialState: TDetailsState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
  showOrderModal: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderNumberActions
): TDetailsState => {
  switch (action.type) {
  case GET_ORDER_REQUEST:
    return {
      ...state,
      orderRequest: true,
      orderFailed: false
    };
  case GET_ORDER_SUCCESS:
    return {
      ...state,
      orderRequest: false,
      orderFailed: false,
      order: action.order
    };
  case GET_ORDER_ERROR:
    return {
      ...state,
      orderRequest: false,
      orderFailed: true,
      order: null
    };
  case SHOW_ORDER:
    return {
      ...state,
      showOrderModal: true
    };
  case CLOSE_ORDER:
    return {
      ...state,
      showOrderModal: false,
      order: null
    };
  default:
    return state;
  }
};
