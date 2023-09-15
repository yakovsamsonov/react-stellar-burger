import { BACKEND_BASE_URL } from './constants';
import { getCookie } from './cookie';

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

export function registerUser(newUser) {
  const endpoint = `${BACKEND_BASE_URL}/auth/register`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(newUser),
  };
  return loadData(endpoint, options);
}

export function getUserRequest() {}

export function loginRequest(loginData) {
  const endpoint = `${BACKEND_BASE_URL}/auth/login`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(loginData),
  };

  return loadData(endpoint, options);
}

export function logoutRequest() {
  const endpoint = `${BACKEND_BASE_URL}/auth/logout`;

  const token = { token: getCookie('refreshToken') };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(token),
  };

  return loadData(endpoint, options);
}
