import axios from 'axios';
import { getTokenAndId } from './authentication';

const origin = 'http://localhost:8080/api/v1/games/memoryGame';

export const getNewMemoryGame = (groupId: number, starred: boolean | null, maxAmount: number) => {
  const [token, userId] = getTokenAndId();
  return axios.post(
    `${origin}`,
    {
      userId,
      maxAmount,
      groupId,
      starred,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
