import { useEffect, useState } from 'react';
import { Box } from '../PhraseBox/Box';
import './LearnPhrase.css';
import { getListOfPhrases } from '../../services/phrase';
import { Phrase } from '../../App';

export const PhraseLearn = () => {
  const [data, setData] = useState<Array<Phrase>>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getListOfPhrases()
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const increaseCount = () => count < data.length - 1 && setCount((prev) => prev + 1);

  const decreaseCount = () => count > 0 && setCount((prev) => prev - 1);

  return (
    <div
      id='phraseLearnContainer'
      className='center'>
      <div className='boxContainer'>
        <Box {...data[count]} />
      </div>

      <div className='buttons center'>
        <button
          disabled={count === 0}
          onClick={decreaseCount}>
          {'<'}
        </button>

        <p className='counterInfo'>
          {count + 1}/{data.length}
        </p>

        <button
          disabled={count === data.length - 1}
          onClick={increaseCount}>
          {'>'}
        </button>
      </div>
    </div>
  );
};
