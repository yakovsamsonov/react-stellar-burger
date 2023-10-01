export const localStorage = window.localStorage;
export const ADD_TO_STORAGE = 'add';
export const GET_FROM_STORAGE = 'get';
export const REMOVE_FROM_STORAGE = 'remove';

export function clear() {
  localStorage.clear();
}

export function modify(action, key, value) {
  switch (action) {
    case ADD_TO_STORAGE: {
      return localStorage.setItem(key, value);
    }
    case GET_FROM_STORAGE: {
      return localStorage.getItem(key);
    }
    case REMOVE_FROM_STORAGE: {
      return localStorage.removeItem(key);
    }
    default: {
    }
  }
}
