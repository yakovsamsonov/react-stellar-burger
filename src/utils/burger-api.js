import { BACKEND_BASE_URL } from './constants';
import {
  getAccessToken,
  getRefreshToken,
  setUserCookiesFromResponce,
} from './cookie';

const baseHeaders = { 'Content-Type': 'application/json; charset=UTF-8' };

function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function checkSuccess(res) {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ошибка запроса: ${res}`);
}

function loadData(url, options) {
  return fetch(url, options).then(checkReponse).then(checkSuccess);
}

export function loadIngredients() {
  const endpoint = `${BACKEND_BASE_URL}/ingredients`;
  return loadData(endpoint);
}

export function loadOrderDetails(orderNum) {
  const endpoint = `${BACKEND_BASE_URL}/orders/${orderNum}`;
  return loadData(endpoint);
}

export function placeOrder(requestData) {
  const endpoint = `${BACKEND_BASE_URL}/orders`;

  const options = {
    method: 'POST',
    headers: { ...baseHeaders, Authorization: 'Bearer ' + getAccessToken() },
    body: JSON.stringify({ ingredients: requestData }),
  };
  return loadData(endpoint, options);
}

export function registerUser(newUser) {
  const endpoint = `${BACKEND_BASE_URL}/auth/register`;

  const options = {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify(newUser),
  };
  return loadData(endpoint, options);
}

export function updateUser(newUser) {
  const endpoint = `${BACKEND_BASE_URL}/auth/user`;

  const options = {
    method: 'PATCH',
    headers: {
      ...baseHeaders,
      Authorization: 'Bearer ' + getAccessToken(),
    },
    body: JSON.stringify(newUser),
  };
  return loadData(endpoint, options);
}

export function getUserRequestWithRefresh() {
  return getUserRequest().catch((err) => {
    console.log(err);
    return refreshToken()
      .then((data) => {
        setUserCookiesFromResponce(data);
      })
      .then((data) => getUserRequest())
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  });
}

export function getUserRequest() {
  const endpoint = `${BACKEND_BASE_URL}/auth/user`;

  const options = {
    method: 'GET',
    headers: {
      ...baseHeaders,
      Authorization: 'Bearer ' + getAccessToken(),
    },
  };

  return loadData(endpoint, options);
}

function refreshToken() {
  const endpoint = `${BACKEND_BASE_URL}/auth/token`;

  const options = prepareLogoutOptions();

  return loadData(endpoint, options).catch((err) => {
    return Promise.reject(err);
  });
}

function prepareLogoutOptions() {
  const token = { token: getRefreshToken() };

  return {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify(token),
  };
}

export function login(loginData) {
  const endpoint = `${BACKEND_BASE_URL}/auth/login`;

  const options = {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify(loginData),
  };

  return loadData(endpoint, options).then((data) => {
    setUserCookiesFromResponce(data);
    return Promise.resolve(data);
  });
}

export function logout() {
  const endpoint = `${BACKEND_BASE_URL}/auth/logout`;

  const options = prepareLogoutOptions();

  return loadData(endpoint, options);
}

export function requestChangeToken(email) {
  const endpoint = `${BACKEND_BASE_URL}/password-reset`;

  const options = {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify(email),
  };

  return loadData(endpoint, options);
}

export function changePassword(changeRequest) {
  const endpoint = `${BACKEND_BASE_URL}/password-reset/reset`;

  const options = {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify(changeRequest),
  };

  return loadData(endpoint, options);
}
