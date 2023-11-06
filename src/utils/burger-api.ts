import { BACKEND_BASE_URL } from './constants';
import {
  getAccessToken,
  getRefreshToken,
  setUserCookiesFromResponce,
} from './cookie';
import {
  ServerRequestType,
  TEmail,
  TNewUser,
  TPasswordUpdate,
  TUserWithPassword,
} from './prop-types';

type TRequestOptions = {
  method: ServerRequestType;
  headers: HeadersInit;
  body?: string;
};

type TPayload = {
  [name: string]: string | Array<string>;
};

const baseUrl = new URL(BACKEND_BASE_URL);

const createRequestOptions = (
  method: ServerRequestType,
  auth: boolean = false,
  payload?: TPayload
): TRequestOptions => {
  const headers: {
    [name: string]: string;
  } = { 'Content-Type': 'application/json; charset=UTF-8' };
  if (auth) {
    headers['Authorization'] = 'Bearer ' + getAccessToken();
  }
  if (payload) {
    return { method: method, headers: headers, body: JSON.stringify(payload) };
  } else return { method: method, headers: headers };
};

function checkReponse(res: Response): Promise<any> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function checkSuccess(res: { success: boolean }): Promise<any> {
  if (res?.success) {
    return Promise.resolve(res);
  }
  return Promise.reject(`Ошибка запроса: ${res}`);
}

function loadData(url: URL, options?: TRequestOptions) {
  return fetch(url, options).then(checkReponse).then(checkSuccess);
}

export function loadIngredients() {
  const endpoint = new URL('/api/ingredients', baseUrl);
  return loadData(endpoint);
}

export function loadOrderDetails(orderNum: string) {
  const endpoint = new URL(`/api/orders/${orderNum}`, baseUrl);
  return loadData(endpoint);
}

export function placeOrder(requestData: Array<string>) {
  const endpoint = new URL('/api/orders', baseUrl);
  const options = createRequestOptions(ServerRequestType.post, true, {
    ingredients: requestData,
  });

  return loadData(endpoint, options);
}

export function registerUser(newUser: TNewUser) {
  const endpoint = new URL('/api/auth/register', baseUrl);

  const options = createRequestOptions(ServerRequestType.post, false, newUser);
  return loadData(endpoint, options);
}

export function updateUser(newUser: TNewUser) {
  const endpoint = new URL('/api/auth/user', baseUrl);
  const options = createRequestOptions(ServerRequestType.patch, true, newUser);

  return loadData(endpoint, options);
}

export function getUserRequestWithRefresh() {
  return getUserRequest().catch((err) => {
    return refreshToken()
      .then((data) => {
        setUserCookiesFromResponce(data);
      })
      .then(() => getUserRequest())
      .catch((err) => {
        return Promise.reject(err);
      });
  });
}

export function getUserRequest() {
  const endpoint = new URL('/api/auth/user', baseUrl);

  const options = createRequestOptions(ServerRequestType.get, true);
  return loadData(endpoint, options);
}

function refreshToken() {
  const endpoint = new URL('/api/auth/token', baseUrl);

  const refreshToken = getRefreshToken();

  if (refreshToken) {
    const options = createRequestOptions(ServerRequestType.post, false, {
      token: refreshToken,
    });
    return loadData(endpoint, options);
  } else {
    return Promise.reject('Не найдено токена для обновления');
  }
}

export function login(loginData: TUserWithPassword) {
  const endpoint = new URL('/api/auth/login', baseUrl);

  const options = createRequestOptions(
    ServerRequestType.post,
    false,
    loginData
  );

  return loadData(endpoint, options).then((data) => {
    setUserCookiesFromResponce(data);
    return Promise.resolve(data);
  });
}

export function logout() {
  const endpoint = new URL('/api/auth/logout', baseUrl);

  const refreshToken = getRefreshToken();

  if (refreshToken) {
    const options = createRequestOptions(ServerRequestType.post, false, {
      token: refreshToken,
    });
    return loadData(endpoint, options);
  } else {
    return Promise.reject('Не найдено токена для обновления');
  }
}

export function requestChangeToken(email: TEmail) {
  const endpoint = new URL('/api/password-reset', baseUrl);
  const options = createRequestOptions(ServerRequestType.post, false, email);

  return loadData(endpoint, options);
}

export function changePassword(changeRequest: TPasswordUpdate) {
  const endpoint = new URL('/api/password-reset/reset', baseUrl);
  const options = createRequestOptions(
    ServerRequestType.post,
    false,
    changeRequest
  );

  return loadData(endpoint, options);
}
