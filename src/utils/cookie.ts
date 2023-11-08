import { Cookies } from './prop-types';

interface IDictionary<TValue> {
  [key: string]: TValue;
}

const getCookie = (name: Cookies): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getAccessToken = (): string | undefined => {
  return getCookie(Cookies.access);
};

export const getRefreshToken = (): string | undefined => {
  return getCookie(Cookies.refresh);
};

export const setCookie = (
  name: Cookies,
  value: string | undefined,
  props?: { expires: number }
): void => {
  const newProps: IDictionary<string | boolean> = {};
  if (props?.expires) {
    let exp: number | Date | string = props.expires;
    if (typeof exp == 'number') {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = d;
      if (exp instanceof Date) {
        newProps.expires = exp.toUTCString();
      }
    }
  }

  let updatedCookie = name.toString();
  if (!value) {
    value = getCookie(name);
  }
  if (value) {
    value = encodeURIComponent(value);
    updatedCookie = updatedCookie + '=' + value;
    for (const propName in newProps) {
      updatedCookie += '; ' + propName;
      const propValue = newProps[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
};

export const deleteCookie = (name: Cookies): void => {
  setCookie(name, undefined, { expires: -1 });
};

export const setUserCookiesFromResponce = (responce: {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}): void => {
  if (responce.success) {
    setCookie(Cookies.access, responce.accessToken.split('Bearer ')[1]);
    setCookie(Cookies.refresh, responce.refreshToken);
  }
};
