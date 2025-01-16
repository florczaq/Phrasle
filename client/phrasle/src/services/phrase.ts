import axios from 'axios';
import { Phrase } from '../App';
import { getTokenAndId } from './authentication';

/** Base URL for phrase management API endpoints */
const origin = 'http://localhost:8080/api/v1/phrase';

/**
 * Adds a new phrase to the user's account.
 *
 * @param {Phrase} phrase - An object representing the phrase to add, including value and definition.
 * @returns {Promise} - A promise that resolves to the server's response.
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
 * Retrieves the total number of phrases associated with the current user.
 *
 * @returns {Promise} - A promise that resolves to the count of phrases.
 */
export const getAmountOfPhrases = (): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.get(`${origin}/amount?u=${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/**
 * Fetches the total number of phrases for the current user based on the specified group and starred status.
 *
 * @param {boolean | null} starred - Indicates whether to filter phrases by their starred status.
 *                                   Pass `true` for starred, `false` for non-starred, or `null` for all.
 * @param {number} groupId - The ID of the group for which phrases are being counted.
 * @returns {Promise<any>} - A promise that resolves to the count of phrases.
 */
export const getAmountOfPhrasesByGroup = (
  starred: boolean | null,
  groupId: number
): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.get(
    `${origin}/amount?u=${userId}&&gid=${groupId}${starred != null ? `&&s=${starred}` : ''}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Retrieves a list of phrases associated with the current user.
 *
 * @param {boolean | null} starred - Filter to specify phrase type:
 *   - `true` fetches only starred phrases.
 *   - `false` fetches only unstarred phrases.
 *   - `null` fetches all phrases.
 * @param {number} groupId - The ID of the group to fetch phrases for.
 * @returns {Promise} - A promise resolving to the server's response containing the list of phrases.
 */
export const getListOfPhrases = (starred: boolean | null, groupId: number): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.get(
    `${origin}/list?u=${userId}&&gid=${groupId}${starred !== null ? `&&s=${starred}` : ''}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Retrieves a shuffled list of phrases for the current user.
 *
 * @param {boolean | null} starred - Filter to specify phrase type:
 *   - `true` fetches only starred phrases.
 *   - `false` fetches only unstarred phrases.
 *   - `null` fetches all phrases.
 * @param {number} groupId - The ID of the group to fetch phrases for.
 * @returns {Promise} - A promise resolving to the server's response containing the shuffled list.
 */
export const getShuffledListOfPhrases = (
  starred: boolean | null,
  groupId: number
): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.get(
    `${origin}/list/shuffle?u=${userId}&&gid=${groupId}${
      starred !== null ? (starred ? '&&s=true' : '&&s=false') : ''
    }`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

/**
 * Deletes a specific phrase from the user's account.
 *
 * @param {Phrase} phrase - The phrase object to delete, identified by its unique properties.
 * @returns {Promise} - A promise resolving to the server's response after deletion.
 */
export const deletePhrase = (phrase: Phrase): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.delete(`${origin}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { ...phrase, userId },
  });
};

/**
 * Updates an existing phrase in the user's account.
 *
 * @param {Phrase} phrase - The phrase object containing updated properties.
 * @returns {Promise} - A promise resolving to the server's response after the update.
 */
export const editPhrase = (phrase: Phrase): Promise<any> => {
  const [token, userId] = getTokenAndId();
  return axios.put(
    `${origin}/edit`,
    { ...phrase, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
