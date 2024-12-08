import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { getListOfPhrases, getShuffledListOfPhrases } from '../../services/phrase';
import { Box } from '../PhraseBox/Box';
import './Flashcards.css';

import yellowStar from '../../assets/image/yellow_star.png';
import transparentStar from '../../assets/image/star.png';
import halfStar from '../../assets/image/half_star.png';
import shuffleIcon from '../../assets/image/shuffle.png';
import React from 'react';

const radioOptions = ['unstarred', 'all', 'starred'];

export const Flashcards = () => {
  const [data, setData] = useState<Array<Phrase>>([]);
  const [count, setCount] = useState<number>(0);
  const [starred, setStarred] = useState<boolean | null>(null);
  const [shuffle, setShuffle] = useState<boolean>(false);
  //TEMP
  const [showVal, setShowVal] = useState<boolean>(true);

  const getPhrases = React.useCallback(
    () =>
      getListOfPhrases(starred, 2)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err)),
    [starred]
  );

  const getShuffledPhrases = React.useCallback(
    () =>
      getShuffledListOfPhrases(starred)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err)),
    [starred]
  );

  const getList = React.useCallback(() => {
    setCount(0);
    shuffle ? getShuffledPhrases() : getPhrases();
  }, [getPhrases, getShuffledPhrases, shuffle]);

  useEffect(() => getList(), [getList]);

  const increaseCount = () => count < data.length - 1 && setCount((prev) => prev + 1);

  const decreaseCount = () => count > 0 && setCount((prev) => prev - 1);

  const handleStarFilterRadioChange = (e: any) => {
    let optionIndex = -1;
    setCount(0);

    radioOptions.forEach((element, index) => {
      if (element === e.target['id']) optionIndex = index;
    });

    switch (optionIndex) {
      case 0:
        setStarred(false);
        break;
      case 1:
        setStarred(null);
        break;
      case 2:
        setStarred(true);
        break;
    }
  };

  const handleShuffleCheckboxChange = () => {
    setShuffle((prev) => !prev);
  };

  return (
    <div
      id='flashCardContainer'
      className='center'>
      <form className='starOptions'>
        <label>
          <input
            type='radio'
            name='starred'
            id={radioOptions.at(0)}
            onClick={(e) => handleStarFilterRadioChange(e)}
            onChange={() => {}}
            checked={starred === false}
          />
          <img
            src={transparentStar}
            alt=''
          />
        </label>
        <label>
          <input
            type='radio'
            name='starred'
            id={radioOptions.at(1)}
            onClick={(e) => handleStarFilterRadioChange(e)}
            onChange={() => {}}
            checked={starred === null}
          />
          <img
            src={halfStar}
            alt=''
          />
        </label>
        <label>
          <input
            type='radio'
            name='starred'
            id={radioOptions.at(2)}
            onClick={(e) => handleStarFilterRadioChange(e)}
            onChange={() => {}}
            checked={starred === true}
          />
          <img
            src={yellowStar}
            alt=''
          />
        </label>
      </form>
      <div className='flashCard center'>
        <div className={`boxContainer ${showVal ? '_value' : '_definition'}`}>
          <Box
            value={data[count]?.value}
            definition={data[count]?.definition}
            onClick={(newVal: boolean) => {
              setShowVal(newVal);
            }}
          />
        </div>
        <label>
          <input
            type='checkbox'
            checked={shuffle}
            onChange={() => {}}
            onClick={() => handleShuffleCheckboxChange()}
          />
          <img
            src={shuffleIcon}
            alt='shuffle'
          />
        </label>
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
