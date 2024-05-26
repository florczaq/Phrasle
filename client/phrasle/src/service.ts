import axios from 'axios';
import { Phrase, User } from './App';
import { KEY, TYPE, get } from './storage';

const origin = 'http://localhost:8080/api/v1';

/**
 * @param email string
 * @param password string
 * @returns promise with jwt token
 */
export const register = (user: typeof User) => {
  return axios.post(`${origin}/auth/register`, user);
};

/**
 *
 * @param email
 * @param password
 * @returns promise with jwt token
 */
export const authenticate = (user: typeof User) => {
  return axios.post(`${origin}/auth/authenticate`, user);
};

export const addPhrase = (phrase: Phrase) => {
  const uid = get(TYPE.COOKIE, KEY.UID);
  const token = get(TYPE.COOKIE, KEY.TOKEN);

  return axios.post(
    `${origin}/phrase/add`,
    { ...phrase, userId:uid },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
