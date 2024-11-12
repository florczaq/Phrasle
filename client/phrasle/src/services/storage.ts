import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

/**
 * Enum representing keys for various types of stored data.
 */
export enum KEY {
  /** Key for storing authentication token */
  TOKEN = 'token',
  /** Key for storing user identifier */
  UID = 'uid',
   /** Key for storing the number of questions in a quiz */
  QUIZ_QUESTION_AMOUNT="qqa",
  /** Key for storing quiz-related data */
  QUIZ="qz"
}

/**
 * Enum representing different storage types.
 */
export enum TYPE {
  SESSION,
  LOCAL,
  COOKIE,
}

/**
 * Interface representing the structure of a quiz object.
 */
export interface QUIZ{
  /** Optional property to store quiz score */
  score?: number,
  /** Required property to store the number of questions in the quiz */
  numberOfQuestions: number;
}

/**
 * Saves data to a specified storage type.
 * 
 * @param {TYPE} type - The type of storage (SESSION, LOCAL, COOKIE).
 * @param {KEY} key - The key used to identify the data.
 * @param {string} data - The data to store, as a string.
 * 
 * @returns {void}
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

/**
 * Retrieves data from a specified storage type.
 * 
 * @param {TYPE} type - The type of storage (SESSION, LOCAL, COOKIE).
 * @param {KEY} key - The key used to identify the data.
 * 
 * @returns {string | null} - The retrieved data as a string, or null if not found.
 */
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

/**
 * Removes data from a specified storage type.
 * 
 * @param {TYPE} type - The type of storage (SESSION, LOCAL, COOKIE).
 * @param {KEY} key - The key used to identify the data to remove.
 * 
 * @returns {void}
 */
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
