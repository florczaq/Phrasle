import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

export enum KEY {
  TOKEN = 'token',
  UID = 'uid',
}

export enum TYPE {
  SESSION,
  LOCAL,
  COOKIE,
}

/**
 *
 * @param type
 * @param key
 * @param data
 */
export const save = (type: TYPE, key: KEY, data: string): void => {
  switch (type) {
    case TYPE.SESSION:
      sessionStorage.setItem(key, data);
      break;
    case TYPE.LOCAL:
      localStorage.setItem(key, data);
      break;
    case TYPE.COOKIE:
      setCookie(key, data);
      break;
  }
};

export const get = (type: TYPE, key: KEY): string | null => {
  switch (type) {
    case TYPE.SESSION:
      return sessionStorage.getItem(key);
    case TYPE.LOCAL:
      return localStorage.getItem(key);
    case TYPE.COOKIE:
      return getCookie(key) || null;
  }
};

export const remove = (type: TYPE, key: KEY): void => {
  switch (type) {
    case TYPE.SESSION:
      sessionStorage.removeItem(key);
      break;
    case TYPE.LOCAL:
      localStorage.removeItem(key);
      break;
    case TYPE.COOKIE:
      removeCookie(key);
      break;
  }
};
