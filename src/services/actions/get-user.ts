import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS
} from './constants';
import { getUserRequest, updateToken } from '../api';
import { AppDispatch } from '../../services/hooks';
import type { TRegistrationForm } from '../../utils/types';

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  form: TRegistrationForm;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export type TGetUserActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed;

function userRequest() {
  return {
    type: GET_USER_REQUEST
  }
}
function userSuccess(response: any) {
  return {
    type: GET_USER_SUCCESS,
    form: response.user
  }
}
function userFaled() {
  return {
    type: GET_USER_FAILED
  }
}
function updateUserSuccess(response: any) {
  return {
    type: UPDATE_USER_SUCCESS,
    form: response.user
  }
}

export const getUser = () => {
  return async function (dispatch: AppDispatch) {
    dispatch(userRequest());
    try {
      const response = await getUserRequest();
      if (response && response.success) {
        dispatch(userSuccess(response));
        dispatch(updateUserSuccess(response));
      }
    } catch (error: any) {
      try {
        if (
          error.message === 'jwt expired' || error.message === 'Token is invalid'
        ) {
          deleteCookie('accessToken');
          const refreshToken = getCookie('refreshToken');
          const data = await updateToken(refreshToken);
          if (data.success) {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
          }
          const response = await getUserRequest();
          if (response.success) {
            dispatch(userSuccess(response));
            dispatch(updateUserSuccess(response));
          }
        } else {
          dispatch(userFaled());
          return Promise.reject(error);
        }
      } catch (error) {
        console.log(error);
        dispatch(userFaled());
      }
    }
  };
};
