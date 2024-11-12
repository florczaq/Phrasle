import axios from 'axios';
import { User } from '../App';
import { KEY, TYPE, get, remove } from './storage';

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
export const authenticate = (user: typeof User, staySignedIn: boolean) => {
  return axios.post(`${origin}/authenticate`, { ...user, staySignedIn });
};

export const getToken = (): string | null => {
  if (get(TYPE.LOCAL, KEY.TOKEN)) return get(TYPE.LOCAL, KEY.TOKEN);
  return get(TYPE.COOKIE, KEY.TOKEN);
};

export const getUserId = (): string | null => {
  if (get(TYPE.LOCAL, KEY.UID)) return get(TYPE.LOCAL, KEY.UID);
  return get(TYPE.COOKIE, KEY.UID);
};

export const signOut = () => {
  if (get(TYPE.LOCAL, KEY.TOKEN)) remove(TYPE.LOCAL, KEY.TOKEN);
  if (get(TYPE.LOCAL, KEY.UID)) remove(TYPE.LOCAL, KEY.UID);
  if (get(TYPE.COOKIE, KEY.TOKEN)) remove(TYPE.COOKIE, KEY.TOKEN);
  if (get(TYPE.COOKIE, KEY.UID)) remove(TYPE.COOKIE, KEY.UID);
};

export const getTokenAndId = () => [getToken(), getUserId()];
