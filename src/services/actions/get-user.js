import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS
} from './constants';
import { getUserRequest, updateToken } from '../api';

function userRequest() {
  return {
    type: GET_USER_REQUEST
  }
}
function userSuccess(response) {
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
function updateUserSuccess(response) {
  return {
    type: UPDATE_USER_SUCCESS,
    form: response.user
  }
}

export const getUser = () => {
  return async function (dispatch) {
    dispatch(userRequest);
    try {
      const response = await getUserRequest();
      if (response && response.success) {
        dispatch(userSuccess(response));
        dispatch(updateUserSuccess(response));
      }
    } catch (error) {
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
          dispatch(userFaled);
          return Promise.reject(error);
        }
      } catch (error) {
        console.log(error);
        dispatch(userFaled);
      }
    }
  };
};
