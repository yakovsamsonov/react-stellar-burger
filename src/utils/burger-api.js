import { BACKEND_BASE_URL } from '../components/constants/constants';

function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function loadData(url, options) {
  return fetch(url, options).then(checkReponse);
}

export function loadIngredients() {
  const endpoint = `${BACKEND_BASE_URL}/ingredients`;
  return loadData(endpoint);
}

export function placeOrder(requestData) {
  const endpoint = `${BACKEND_BASE_URL}/orders`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ ingredients: requestData }),
  };
  return loadData(endpoint, options);
}
