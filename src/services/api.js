import { getCookie } from './../utils/cookie';

export const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
};

const BURGER_API = 'https://norma.nomoreparties.space/api';

export function orderBurgerApi(arr) {
  const response = fetch(`${BURGER_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients: arr})
  })
  .then(response => {
    if (!response && !response.success) {
      throw new Error('Something went wrong');
    }
    return response.json();
  })
  return response;
}

export function ingredientsApi() {
  const response = fetch(`${BURGER_API}/ingredients`)
  .then(response => {
    if (!response && !response.success) {
      throw new Error('Something went wrong');
    }
    return response.json();
  })
  return response;
}

export const getUserRequest = async () => {
  const response = await fetch(`${BURGER_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
  });
  return checkResponse(response);
};
  
export const updateToken = async (token) => {
  return await fetch(`${BURGER_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkResponse);
};

export const getUpdateUserRequest = async (form) => {
  const res = await fetch(`${BURGER_API}/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
  });
  return checkResponse(res);
};
