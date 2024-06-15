import { useState } from 'react';
import './Box.css';
import { Phrase } from '../../App';


export const Box = ({ value, definition }: Phrase) => {
  const [showPhrase, setPhraseVisible] = useState(true);

  const onBoxClick = () => {
    definition && setPhraseVisible((prev) => !prev);
  };

  return (
    <div
      id='phraseBox'
      className={`center ${definition && 'pBox_hoverable'}`}
      onClick={() => onBoxClick()}>
      <p>{showPhrase ? "#1 " + value : "#2 " + definition}</p>
    </div>
  );
};
