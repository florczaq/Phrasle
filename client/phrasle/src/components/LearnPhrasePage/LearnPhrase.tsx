import { useEffect, useState } from 'react';
import { Box } from '../PhraseBox/Box';
import './LearnPhrase.css';

export const PhraseLearn = () => {
  const [data, setData] = useState<Array<{ phrase: string; definition: string }>>([]);
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    setData([
      { phrase: 'Apple', definition: 'Not orange' },
      { phrase: 'Orange', definition: 'Not apple' },
    ]);
  }, []);

  const increaseCount = () => count < data.length - 1 && setCount((prev) => prev + 1);

  const decreaseCount = () => count > 0 && setCount((prev) => prev - 1);

  return (
    <div
      id='phraseLearnContainer'
      className='center'>
      <Box {...data[count]} />

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
