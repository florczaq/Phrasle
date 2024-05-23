import React, { useState } from 'react';
import './Box.css';

interface BoxParams {
  phrase: string;
  definition?: string;
}

export const Box = ({ phrase = '', definition }: BoxParams) => {
  const [showPhrase, setPhraseVisible] = useState(true);

  const onBoxClick = () => {
    definition && setPhraseVisible((prev) => !prev);
  };

  return (
    <div
      id='phraseBox'
      className={`center ${definition && 'pBox_hoverable'}`}
      onClick={() => onBoxClick()}>
      <p>{showPhrase ? phrase : definition}</p>
    </div>
  );
};
