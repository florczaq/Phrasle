import axios from 'axios';
import { Group } from '../App';
import { getTokenAndId } from './authentication';

const origin = 'http://localhost:8080/api/v1/phrase/group';

export const getGroupList = () => {
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/list?uid=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getGroupListDetails = () => {
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/list/details?uid=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addGroup = (group: Group) => {
  const [token] = getTokenAndId();
  console.log(group);
  return axios.post(
    `${origin}/add`,
    { ...group },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteGroup = (group: Group) => {
  const [token] = getTokenAndId();

  return axios.delete(`${origin}/delete`, {
    data: { ...group },
    headers: { Authorization: `Bearer ${token}` },
  });
};
