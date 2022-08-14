import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SET_USER
} from './constants';
import { updateToken, getUpdateUserRequest } from '../api';
import { AppDispatch, AppThunk } from '../../services/hooks';
import type { TRegistrationForm } from '../../utils/types';

interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  form: TRegistrationForm;
}

interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

interface ISetUser {
  readonly type: typeof SET_USER;
  payload: TRegistrationForm;
}

export type TUpdateUserActions =
  | ISetUser
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed;

function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST
  }
}
function updateUserSuccess(response: any) {
  return {
    type: UPDATE_USER_SUCCESS,
    form: response.user
  }
}
function updateUserFaled() {
  return {
    type: UPDATE_USER_FAILED
  }
}

function getUserSuccess() {
  return {
    type: GET_USER_SUCCESS
  }
}

export const updateUser: AppThunk = (form) => {
  return async function (dispatch: AppDispatch) {
    dispatch(updateUserRequest());
    try {
      const response = await getUpdateUserRequest(form);
      if (response && response.success) {
        dispatch(updateUserSuccess(response));
      }
    } catch (error: any) {
      console.log(error);
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
          const response = await getUpdateUserRequest(form);
          if (response && response.success) {
            dispatch(updateUserSuccess(response));
            dispatch(getUserSuccess());
          }
        } else {
          dispatch(updateUserFaled());
          return Promise.reject(error);
        }
      } catch (error) {
        console.log(error);
        dispatch(updateUserFaled());
      }
    }
  };
}
