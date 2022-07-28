import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED
} from './constants';
import { updateToken, getUpdateUserRequest } from '../api';  

function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST
  }
}
function updateUserSuccess(response) {
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

export function updateUser(form) {
  return async function (dispatch) {
    dispatch(updateUserRequest);
    try {
      const response = await getUpdateUserRequest(form);
      if (response && response.success) {
        dispatch(updateUserSuccess(response));
      }
    } catch (error) {
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
            dispatch(getUserSuccess);
          }
        } else {
          dispatch(updateUserFaled);
          return Promise.reject(error);
        }
      } catch (error) {
        console.log(error);
        dispatch(updateUserFaled);
      }
    }
  };
}
