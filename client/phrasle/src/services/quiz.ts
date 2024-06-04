import axios from 'axios';
import { KEY, TYPE, get } from '../storage';

const origin = 'http://localhost:8080/api/v1/games/quiz';

export const getNewQuizSet = () => {
  const userId = get(TYPE.COOKIE, KEY.UID);
  const token = get(TYPE.COOKIE, KEY.TOKEN);
  return axios.get(`${origin}/renderNew?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCorrectAnswer = (gameId: number | undefined) => {
  const token = get(TYPE.COOKIE, KEY.TOKEN);
  return axios.get(`${origin}/getAnswer?g=${gameId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const finishQuizAndClearRecord = () => {
  const userId = get(TYPE.COOKIE, KEY.UID);
  const token = get(TYPE.COOKIE, KEY.TOKEN);
  return axios.delete(`${origin}/finish`, {
    data:{userId},
    headers: { Authorization: `Bearer ${token}` },
  });
};
