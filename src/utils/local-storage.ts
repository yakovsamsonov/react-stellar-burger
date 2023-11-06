import { StorageAction, StorageActionKey } from './prop-types';

export const localStorage = window.localStorage;

export const clear = (): void => {
  localStorage.clear();
};

export const modify = (
  action: StorageAction,
  key: StorageActionKey,
  value?: string
): string | null => {
  switch (action) {
    case StorageAction.add: {
      if (value) {
        localStorage.setItem(key, value);
      }
      return null;
    }
    case StorageAction.get: {
      return localStorage.getItem(key);
    }
    case StorageAction.remove: {
      localStorage.removeItem(key);
      return null;
    }
  }
};
