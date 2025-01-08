import axios from 'axios';
import { getTokenAndId } from './authentication';

const origin = 'http://localhost:8080/api/v1/phrase/group';

export const getGroupList = () =>{
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/list?uid=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}