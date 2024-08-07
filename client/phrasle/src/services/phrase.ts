import axios from 'axios';
import { Phrase } from '../App';
import { getTokenAndId } from './authentication';

const origin = 'http://localhost:8080/api/v1/phrase';


/**
 * @param phrase typeof Phrase
 * @returns https status
 */
export const addPhrase = (phrase: Phrase) => {
  const [token, userId] = getTokenAndId();
  return axios.post(
    `${origin}/add`,
    { ...phrase, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getAmountOfPhrases = () => {
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/amount?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getListOfPhrases = () => {
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/list?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//TODO edit
export const deletePhrase = (phrase: Phrase) => {
  const [token, userId] = getTokenAndId();
  return axios.delete(`${origin}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { ...phrase, userId },
  });
};
