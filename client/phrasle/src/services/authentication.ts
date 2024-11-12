import axios from 'axios';
import { User } from '../App';
import { KEY, TYPE, get, remove } from './storage';

/** Base URL for authentication API endpoints */
const origin = 'http://localhost:8080/api/v1/auth';


/**
 * Registers a new user by sending their data to the registration endpoint.
 * 
 * @param {typeof User} user - The user object containing registration details.
 * 
 * @returns {Promise} - A promise resolving to the server response.
 */
export const register = (user: typeof User) => {
  return axios.post(`${origin}/register`, user);
};

/**
 * Authenticates a user by sending their credentials to the authentication endpoint.
 * Optionally, the user can stay signed in.
 * 
 * @param {typeof User} user - The user object containing login credentials.
 * @param {boolean} staySignedIn - Whether the user should remain signed in.
 * 
 * @returns {Promise} - A promise resolving to the server response with authentication data.
 */
export const authenticate = (user: typeof User, staySignedIn: boolean) => {
  return axios.post(`${origin}/authenticate`, { ...user, staySignedIn });
};

/**
 * Retrieves the authentication token from either local storage or cookies.
 * 
 * @returns {string | null} - The authentication token, or null if not found.
 */
export const getToken = (): string | null => {
  if (get(TYPE.LOCAL, KEY.TOKEN)) return get(TYPE.LOCAL, KEY.TOKEN);
  return get(TYPE.COOKIE, KEY.TOKEN);
};

/**
 * Retrieves the user ID from either local storage or cookies.
 * 
 * @returns {string | null} - The user ID, or null if not found.
 */
export const getUserId = (): string | null => {
  if (get(TYPE.LOCAL, KEY.UID)) return get(TYPE.LOCAL, KEY.UID);
  return get(TYPE.COOKIE, KEY.UID);
};

/**
 * Signs out the user by removing their authentication token and user ID
 * from both local storage and cookies.
 * 
 * @returns {void}
 */
export const signOut = () => {
  if (get(TYPE.LOCAL, KEY.TOKEN)) remove(TYPE.LOCAL, KEY.TOKEN);
  if (get(TYPE.LOCAL, KEY.UID)) remove(TYPE.LOCAL, KEY.UID);
  if (get(TYPE.COOKIE, KEY.TOKEN)) remove(TYPE.COOKIE, KEY.TOKEN);
  if (get(TYPE.COOKIE, KEY.UID)) remove(TYPE.COOKIE, KEY.UID);
};

export const getTokenAndId = () => [getToken(), getUserId()];
