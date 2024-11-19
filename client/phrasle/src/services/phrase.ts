import axios from 'axios';
import { Phrase } from '../App';
import { getTokenAndId } from './authentication';

/** Base URL for phrase management API endpoints */
const origin = 'http://localhost:8080/api/v1/phrase';

/**
 * Adds a new phrase associated with the current user.
 *
 * @param {Phrase} phrase - The phrase object to add, containing necessary details.
 *
 * @returns {Promise} - A promise resolving to the server response for the addition.
 */
export const addPhrase = (phrase: Phrase): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.post(
    `${origin}/add`,
    { ...phrase, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

/**
 * Retrieves the count of phrases associated with the current user.
 *
 * @returns {Promise} - A promise resolving to the server response with the phrase count.
 */
export const getAmountOfPhrases = (): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/amount?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * Retrieves the list of phrases associated with the current user.
 * @param {boolean | null} starred - Determines if the request should filter by starred phrases.
 *   - `true`: Fetch only starred phrases.
 *   - `false`: Fetch only non-starred phrases.
 *   - `null`: Fetch all phrases without filtering by starred status.
 * @returns {Promise} - A promise resolving to the server response containing the list of phrases.
 */
export const getListOfPhrases = (starred: boolean | null): Promise<any> => {
  const [token, userId] = getTokenAndId();
  console.log(starred);
  return axios.get(
    `${origin}/list?u=${userId}${starred !== null ? (starred ? '&&s=true' : '&&s=false') : ''}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Deletes a specific phrase associated with the current user.
 *
 * @param {Phrase} phrase - The phrase object to delete, containing necessary details.
 *
 * @returns {Promise} - A promise resolving to the server response for the deletion.
 */
export const deletePhrase = (phrase: Phrase): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.delete(`${origin}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { ...phrase, userId },
  });
};

/**
 * Edits an existing phrase associated with the current user.
 *
 * @param {Phrase} phrase - The phrase object to edit, containing updated details.
 *
 * @returns {Promise} - A promise resolving to the server response for the edit operation.
 */
export const editPhrase = (phrase: Phrase): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.put(
    `${origin}/edit`,
    { ...phrase, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
