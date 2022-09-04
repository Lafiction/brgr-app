import { initialState, userReducer } from './user';
import { TGetUserActions } from '../actions/get-user';
import * as types from '../actions/constants';

const form = {
  name: 'Elena',
  email: 'test123456@ya.ru',
  password: '123456',
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {} as TGetUserActions)).toEqual(
      initialState
    );
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: types.GET_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: true,
    });
  });

  it('should handle GET_USER_FAILED', () => {
    expect(
      userReducer(initialState, {
        type: types.GET_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      getUserFailed: true,
      getUserRequest: false,
      isUser: false,
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      userReducer(
        {
          form: {
            email: '',
            name: '',
            password: '',
          },
          isUser: true,
        },
        {
          type: types.GET_USER_SUCCESS,
          form: form,
        }
      )
    ).toEqual({
      isUser: true,
      form: form,
    });
  });
});

