import React, { useState } from 'react';
import './PhraseList.css';
import { PhraseBox } from './PhraseBox/PhraseBox';
import { Phrase } from '../../../App';
import { deletePhrase } from '../../../services/phrase';

interface PhraseListParams {
  listTitle: string;
  phrases: Phrase[];
}

export const PhraseList = ({ listTitle, phrases }: PhraseListParams) => {
  const [visible, setVisible] = useState(true);

  const handleTitleClick = () => {
    setVisible((prev) => !prev);
  };

  const onDelete = (phrase: Phrase) => {
    deletePhrase(phrase)
      .then(() => window.location.reload())
      .catch((er) => console.error(er));
  };

  return (
    <div
      id='phraseListContainer'
      className='center'>
      <div
        className='listTitle'
        onClick={handleTitleClick}>
        <div className='title'>
          <p>{listTitle}</p>
          <div className={`stateArrow ${visible ? '' : '_right'}`} />
        </div>
        <div className='underline' />
      </div>
      <div className={`listContainer ${!visible ? '_hide' : ''}`}>
        {phrases.map((element, i) => {
          return (
            <PhraseBox
              key={i}
              text={element.value}
              definition={element.definition}
              addDate={new Date()}
              onDelete={() => onDelete(element)}
            />
          );
        })}
      </div>
    </div>
  );
};
