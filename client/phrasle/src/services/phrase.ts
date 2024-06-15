import axios from 'axios';
import { Phrase } from '../App';
import { KEY, TYPE, get } from '../storage';

const origin = 'http://localhost:8080/api/v1/phrase';

/**
 * @param phrase typeof Phrase
 * @returns https status
 */
export const addPhrase = (phrase: Phrase) => {
  const userId = get(TYPE.COOKIE, KEY.UID);
  const token = get(TYPE.COOKIE, KEY.TOKEN);
  return axios.post(
    `${origin}/add`,
    { ...phrase, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getAmountOfUserPhrases = () => {
  const userId = get(TYPE.COOKIE, KEY.UID);
  const token = get(TYPE.COOKIE, KEY.TOKEN);
  return axios.get(`${origin}/amount?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getListOfPhrases = ()=>{
  const userId = get(TYPE.COOKIE, KEY.UID);
  const token = get(TYPE.COOKIE, KEY.TOKEN);
  return axios.get(`${origin}/list?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}