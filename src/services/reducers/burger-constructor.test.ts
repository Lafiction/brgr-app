import { burgerConstructorReducer, initialState } from './burger-constructor';
import type { TBurgerConstructorActions } from '../actions/burger-constructor';
import * as types from '../actions/constants';

const ingredient = {
  type: 'bun' as 'bun' | 'sauce' | 'main',
  _id: '60d3b41abdacab0026a733c6',
  __v: 0,
  name: 'Краторная булка N-200i',
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  price: 1255,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  payload: {
    type: 'bun' as 'bun' | 'sauce' | 'main',
    _id: '60d3b41abdacab0026a733c7',
    __v: 0,
    name: 'Флюоресцентная булка R2-D3',
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    price: 988,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
  },
  dragId: '61ed28ee-2c38-11ed-a261-0242ac120002',
};

const ingredients = [
  { 
    type: 'bun' as 'bun' | 'sauce' | 'main',
    _id: '60d3b41abdacab0026a733c6',
    __v: 0,
    name: 'Краторная булка N-200i',
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    price: 1255,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    dragId: '61ed28ee-2c38-11ed-a261-0242ac120002',
    payload: {
      type: 'bun' as 'bun' | 'sauce' | 'main',
      _id: '60d3b41abdacab0026a733c7',
      __v: 0,
      name: 'Флюоресцентная булка R2-D3',
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      price: 988,
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
    },
  },
];

const bun = {
  type: 'bun' as 'bun' | 'sauce' | 'main',
  _id: '60d3b41abdacab0026a733c6',
  __v: 0,
  name: 'Краторная булка N-200i',
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  price: 1255,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  payload: {
    type: 'bun' as 'bun' | 'sauce' | 'main',
    _id: '60d3b41abdacab0026a733c7',
    __v: 0,
    name: 'Флюоресцентная булка R2-D3',
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    price: 988,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
  },
  dragId: '61ed28ee-2c38-11ed-a261-0242ac120002',
};

describe('burger constructor reducer', () => {
  it('should return the initial state', () => {
    expect(
      burgerConstructorReducer(undefined, {} as TBurgerConstructorActions)
    ).toEqual(initialState);
  });

  it('should handle ADD_BUN', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_BUN,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      bun: bun,
    });
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_INGREDIENT,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: ingredients,
    });
  });

  it('should handle DELETE_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.DELETE_INGREDIENT,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: [],
    });
  });

  it('should handle REPLACE_INGREDIENT', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.REPLACE_INGREDIENT,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: ingredients,
    });
  });

  it('should handle RESET_STATE', () => {
    expect(
      burgerConstructorReducer(initialState, {
        type: types.RESET_STATE,
        index: 0,
        item: ingredient,
        optional: ingredients,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
