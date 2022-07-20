export function orderBurgerApi(arr) {
  const response = fetch('https://norma.nomoreparties.space/api/orders', {
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
  const response = fetch('https://norma.nomoreparties.space/api/ingredients')
  .then(response => {
    if (!response && !response.success) {
      throw new Error('Something went wrong');
    }
    return response.json();
  })
  return response;
}
