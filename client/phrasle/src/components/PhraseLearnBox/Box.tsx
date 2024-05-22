import React, { useState } from 'react';
import './PhraseLearn.css';

interface BoxParams {
  phrase: string;
  definition: string;
}

export const Box = ({ phrase, definition }: BoxParams) => {
  const [showPhrase, setPhraseVisible] = useState(true);

  return (
    <div
      id='phraseBox'
      className='center'
      onClick={() => setPhraseVisible((prev) => !prev)}>
      <p>{showPhrase ? phrase : definition}</p>
    </div>
  );
};
