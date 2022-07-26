import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    SET_PASSWORD,
  } from "../actions/constants";
  
  const initialState = {
    form: {
      password: "",
      token: "",
    },
    isPasswordReseted: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
  };
  
  export const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST: {
        return {
          ...state,
          resetPasswordRequest: true,
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          isPasswordReseted: true,
          resetPasswordRequest: false,
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          isPasswordReseted: false,
          resetPasswordRequest: false,
          resetPasswordFailed: true,
        };
      }
      case SET_PASSWORD: {
        return {
          ...state,
          form: action.payload,
        };
      }
  
      default:
        return state;
    }
  };

  
