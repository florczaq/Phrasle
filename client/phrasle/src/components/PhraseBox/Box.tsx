import { useState } from 'react';
import './Box.css';

type Box = {
  value: string;
  definition: string;
  onClick?: (val: boolean) => void;
};

export const Box = ({ value, definition, onClick }: Box) => {
  const [showPhrase, setPhraseVisible] = useState(true);

  const onBoxClick = () => {
    definition && setPhraseVisible((prev) => !prev);
    if (onClick) onClick(!showPhrase);
  };

  return (
    <div
      id='phraseBox'
      className={`center ${definition && 'pBox_hoverable'}`}
      onClick={() => onBoxClick()}>
      <p>{showPhrase ? value : definition}</p>
    </div>
  );
};
