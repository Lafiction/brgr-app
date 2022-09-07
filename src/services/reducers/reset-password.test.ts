import { resetPasswordReducer, initialState } from './reset-password';
import type { TResetPasswordActions } from '../actions/reset-password';
import * as types from '../actions/constants';

const form = {
  name: 'Elena',
  email: 'test123456@ya.ru',
  password: '123456',
};

const resetForm = {
  password: '123456',
  token:
    '79278e4b-6f1a-4140-9bc0-86e9df572fe6',
};

describe('reset password reducer', () => {
  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {} as TResetPasswordActions)).toEqual(
      initialState
    );
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: types.RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      resetPasswordRequest: true,
    });
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: types.RESET_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isPasswordReseted: false,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
    });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: types.RESET_PASSWORD_SUCCESS,
        form: form,
      })
    ).toEqual({
      ...initialState,
      isPasswordReseted: true,
      resetPasswordRequest: false,
      resetPasswordFailed: false,
    });
  });

  it('should handle SET_PASSWORD', () => {
    expect(
      resetPasswordReducer(initialState, {
        type: types.SET_PASSWORD,
        payload: resetForm,
      })
    ).toEqual({
      ...initialState,
      isPasswordReseted: false,
      resetPasswordRequest: false,
      resetPasswordFailed: false,
      form: resetForm,
    });
  });
});
