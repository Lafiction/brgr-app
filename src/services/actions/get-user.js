import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {   
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS
} from './constants';
import { getUserRequest, updateToken } from '../api';

export const getUser = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    try {
      const response = await getUserRequest();
      if (response && response.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          form: response.user,
        });
        dispatch({
          type: UPDATE_USER_SUCCESS,
          form: response.user,
        });
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
            dispatch({
              type: GET_USER_SUCCESS,
              form: response.user,
            });
            dispatch({
              type: UPDATE_USER_SUCCESS,
              form: response.user,
            });
          }
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
          return Promise.reject(error);
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_USER_FAILED,
        });
      }
    }
  };
};
