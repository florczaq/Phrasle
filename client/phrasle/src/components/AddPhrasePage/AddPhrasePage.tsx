import React, { useState } from 'react';
import './AddPhrasePage.css';
import star from '../../assets/image/star.png';
import yellowStar from '../../assets/image/yellow_star.png';
import { addPhrase } from '../../services/phrase';
import { useNavigate } from 'react-router-dom';

export const AddPhrasePage = () => {
  const [starred, setStarred] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>('');
  const [definition, setDefiniton] = useState<string>('');

  const navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const element = e.target.classList.toString();
    if (element.includes('phrase')) setPhrase(e.target.value);
    if (element.includes('definition')) setDefiniton(e.target.value);
  };

  const onSumbit = () => {
    addPhrase({ value: phrase, definition, starred })
      .then((response) => navigate('/list'))
      .catch((error) => {
        if (error.response.status === 409) {
          console.log(error.response.status);
        }
      });
  };

  return (
    <div
      id='addPhrasePageContainer'
      className='center'>
      <div className='fields center'>
        <input
          type='text'
          className='phrase'
          value={phrase}
          onChange={handleInput}
          placeholder='Phrase...'
        />

        <textarea
          className='definition'
          value={definition}
          onChange={handleInput}
          placeholder='Definition...'
        />
        <button onClick={() => onSumbit()}>Add</button>
      </div>
      <div className='star'>
        <img
          onClick={() => setStarred((prev) => !prev)}
          src={starred ? yellowStar : star}
          alt='star'
        />
      </div>
    </div>
  );
};
