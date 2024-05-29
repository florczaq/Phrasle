import axios from 'axios';
import { User } from '../App';

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



