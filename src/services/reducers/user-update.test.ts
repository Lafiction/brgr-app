import { initialState, userUpdateReducer } from './user-update';
import type { TUpdateUserActions } from '../actions/update-user';
import * as types from '../actions/constants';

const form = {
  name: 'Elena',
  email: 'test123456@ya.ru',
  password: '123456',
};

describe('user update reducer', () => {
  it('should return the initial state', () => {
    expect(userUpdateReducer(undefined, {} as TUpdateUserActions)).toEqual(
      initialState
    );
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(
      userUpdateReducer(initialState, {
        type: types.UPDATE_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: true,
    });
  });

  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      userUpdateReducer(initialState, {
        type: types.UPDATE_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserFailed: true,
      isUpdated: false,
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      userUpdateReducer(
        {
          form: {
            email: '',
            name: '',
            password: '',
          },
          getUserRequest: false,
          getUserFailed: false,
          isUpdated: false,
        },
        {
          type: types.UPDATE_USER_SUCCESS,
          form: form,
        }
      )
    ).toEqual({
      getUserRequest: false,
      getUserFailed: false,
      form: { ...form },
      isUpdated: true,
    });
  });

  it('should handle SET_USER', () => {
    expect(
      userUpdateReducer(
        {
          form: {
            email: '',
            name: '',
            password: '',
          },
        },
        {
          type: types.SET_USER,
          payload: form,
        }
      )
    ).toEqual({
      form: { ...form },
    });
  });
});
