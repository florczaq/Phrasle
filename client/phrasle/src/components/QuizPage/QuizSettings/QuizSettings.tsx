import React, { useEffect, useState } from 'react';
import './QuizSettings.css';
import { getAmountOfPhrases } from '../../../services/phrase';
import { useNavigate } from 'react-router-dom';
import { KEY, save, TYPE, QUIZ } from '../../../services/storage';

export const QuizSettings = () => {
  const [maxAmount, setMaxAmount] = useState<number>(1);
  const [count, setCount] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    getAmountOfPhrases().then((r) => setMaxAmount(r.data - 3));
    return () => {};
  }, []);

  const increaseCount = () => {
    setCount((prev) => (prev + 1 > maxAmount ? maxAmount : prev + 1));
  };

  const decreaseCount = () => {
    setCount((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  const onStart = () => {
    console.log(count);
    const result: QUIZ = { numberOfQuestions: count };
    save(TYPE.SESSION, KEY.QUIZ, JSON.stringify(result));
    navigate('../play/quiz/game');
  };

  const onInputChange = (event: any) => {
    let value = event.target.value;
    setCount(value);
  };

  const validateInputChange = () => {
    if (count < 1) setCount(1);
    if (count > maxAmount) setCount(maxAmount);
  };

  return (
    <div
      style={{ width: '100vw', height: '95vh', display: 'flex' }}
      className='center'>
      <div className='container center'>
        <p>Quiz Settings</p>
        <div className='questionAmount'>
          <label>How many questions?</label>
          <div>
            <button
              disabled={count <= 1}
              onClick={decreaseCount}>
              -
            </button>
            <input
              type='number'
              value={count}
              onChange={onInputChange}
              onBlur={() => validateInputChange()}
            />
            <button
              onClick={increaseCount}
              disabled={count >= maxAmount}>
              +
            </button>
          </div>
        </div>
        <button
          className='startButton'
          onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
};
