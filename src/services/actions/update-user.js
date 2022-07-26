import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED
} from './constants';
import { updateToken, getUpdateUserRequest } from '../api';  

export function updateUser(form) {
  return async function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    try {
      const response = await getUpdateUserRequest(form);
      if (response && response.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          form: response.user,
        });
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
            dispatch({
              type: UPDATE_USER_SUCCESS,
              form: response.user,
            });
            dispatch({
              type: GET_USER_SUCCESS,
            });
          }
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
          return Promise.reject(error);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      }
    }
  };
}
