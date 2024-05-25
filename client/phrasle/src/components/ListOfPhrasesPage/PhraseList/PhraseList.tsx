import React, { useState } from 'react';
import './PhraseList.css';
import { PhraseBox } from './PhraseBox/PhraseBox';

interface PhraseListParams {
  listTitle: string;
}

export const PhraseList = ({ listTitle }: PhraseListParams) => {
  const [visible, setVisible] = useState(true);

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleTitleClick = () => {
    setVisible((prev) => !prev);
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
        {array.map((element, i) => {
          return (
            <PhraseBox
              key={i}
              text={'Consectetur Lorem aliqua sunt ex.'}
              definition=' Sint excepteur id sit eu reprehenderit nisi irure dolore culpa officia irure anim. Cupidatat amet quis excepteur laborum. Voluptate adipisicing duis dolor proident nisi. Occaecat eiusmod laboris ad nisi labore amet ad eu cillum nostrud. Aliqua in incididunt sint voluptate ullamco.'
              addDate={new Date()}
            />
          );
        })}
      </div>
    </div>
  );
};
