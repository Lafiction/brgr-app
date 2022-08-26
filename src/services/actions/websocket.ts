import {   
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_USER_MESSAGE,
  WS_GET_ALL_MESSAGE,
} from './constants';
import { TAllOrders } from '../../utils/types';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ALL_MESSAGE,
};

export interface IWsAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: object;
}

export interface IWsSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetUserOrdersMessageAction {
  readonly type: typeof WS_GET_USER_MESSAGE;
  readonly payload: TAllOrders;
}
export interface IWsGetAllOrdersMessageAction {
  readonly type: typeof WS_GET_ALL_MESSAGE;
  readonly payload: TAllOrders;
}

export type TWsActions =
  | IWsAction
  | IWsSuccessAction
  | IWsErrorAction
  | IWsClosedAction
  | IWsGetUserOrdersMessageAction
  | IWsGetAllOrdersMessageAction;

export const wsConnectionStart = (token?: string): IWsAction => {
  return {
    type: WS_CONNECTION_START,
    payload: { token },
  };
};

export const wsConnectionSuccess = (): IWsSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWsErrorAction => {
  console.log('error');
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWsClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetAllOrdersMessage = (
  message: TAllOrders
): IWsGetAllOrdersMessageAction => {
  return {
    type: WS_GET_ALL_MESSAGE,
    payload: message,
  };
};

export const wsGetUserOrdersMessage = (
  message: TAllOrders
): IWsGetUserOrdersMessageAction => {
  return {
    type: WS_GET_USER_MESSAGE,
    payload: message,
  };
};
