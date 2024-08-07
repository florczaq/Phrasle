import axios from 'axios';
import { User } from '../App';
import { KEY, TYPE, get } from './storage';

const origin = 'http://localhost:8080/api/v1/auth';

/**
 * @param email string
 * @param password string
 * @returns promise with jwt token
 */
export const register = (user: typeof User) => {
  return axios.post(`${origin}/register`, user);
};

/**
 * @param email
 * @param password
 * @returns promise with jwt token
 */
export const authenticate = (user: typeof User) => {
  return axios.post(`${origin}/authenticate`, user);
};

export const getToken = (): string | null => {
  if (get(TYPE.LOCAL, KEY.TOKEN)) return get(TYPE.LOCAL, KEY.TOKEN);
  return get(TYPE.COOKIE, KEY.TOKEN);
};

export const getUserId = (): string | null => {
  if (get(TYPE.LOCAL, KEY.UID)) return get(TYPE.LOCAL, KEY.TOKEN);
  return get(TYPE.COOKIE, KEY.UID);
};

export const getTokenAndId = () => [getToken(), getUserId()];
