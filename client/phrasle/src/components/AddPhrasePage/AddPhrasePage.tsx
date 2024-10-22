import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import star from '../../assets/image/star.png';
import yellowStar from '../../assets/image/yellow_star.png';
import { addPhrase, editPhrase } from '../../services/phrase';
import './AddPhrasePage.css';

export const AddPhrasePage = () => {
  const [starred, setStarred] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [definition, setDefiniton] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);

  const navigate = useNavigate();
  const state = useLocation();

  useEffect(() => {
    const phrase = state?.state?.phrase || undefined;
    if (phrase) {
      setStarred(phrase.starred || false);
      setValue(phrase.value);
      setDefiniton(phrase.definition);
      setEdit(true);
    }
    return () => {};
  }, [state?.state?.phrase]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const element = e.target.classList.toString();
    if (element.includes('phrase')) setValue(e.target.value);
    if (element.includes('definition')) setDefiniton(e.target.value);
  };

  const onSumbit = () => {
    !edit
      ? addPhrase({ value: value, definition, starred })
          .then(() => navigate('/list'))
          .catch((error) => {
            if (error.response.status === 409) {
              console.log(error.response.status);
            }
          })
      : editPhrase({ value, definition, starred })
          .then(() => navigate('/list'))
          .catch((error) => {
            console.log(error.response.status);
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
          value={value}
          onChange={handleInput}
          placeholder='Phrase...'
        />

        <textarea
          className='definition'
          value={definition}
          onChange={handleInput}
          placeholder='Definition...'
        />
        <button onClick={() => onSumbit()}>{edit ? 'Edit' : 'Add'}</button>
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
