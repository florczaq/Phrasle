import axios from 'axios';
import { User } from './App';

const origin = 'http://localhost:8080/api/v1';

/**
 * @param email string
 * @param password string
 * @returns promise with jwt token
 */
export const register = (user: typeof User)=> {
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
