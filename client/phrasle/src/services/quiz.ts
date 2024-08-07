import axios from 'axios';
import { getToken, getTokenAndId } from './authentication';

const origin = 'http://localhost:8080/api/v1/games/quiz';

export const getNewQuizSet = () => {
  const [token, userId] = getTokenAndId();

  return axios.get(`${origin}/renderNew?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCorrectAnswer = (gameId: number | undefined) => {
  const token = getToken();
  return axios.get(`${origin}/getAnswer?g=${gameId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const finishQuizAndClearRecord = () => {
  const [token, userId] = getTokenAndId();

  return axios.delete(`${origin}/finish`, {
    data: { userId },
    headers: { Authorization: `Bearer ${token}` },
  });
};
