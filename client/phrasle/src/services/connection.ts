import axios from "axios";

const origin = 'http://localhost:8080/api/v1/connection';

export const testServerConnection = () => {
  return axios.get(`${origin}`);
};
