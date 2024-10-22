import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phrase } from '../../../App';
import { deletePhrase } from '../../../services/phrase';
import { PhraseBox } from './PhraseBox/PhraseBox';
import './PhraseList.css';

interface PhraseListParams {
  listTitle: string;
  phrases: Phrase[];
}

export const PhraseList = ({ listTitle, phrases }: PhraseListParams) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleTitleClick = () => {
    setVisible((prev) => !prev);
  };

  const onDelete = (phrase: Phrase) => {
    deletePhrase(phrase)
      .then(() => window.location.reload())
      .catch((er) => console.error(er));
  };

  const onEdit = (phrase: Phrase) => {
    navigate('/phraseForm?m=edit', { state: { phrase } });
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
              onDelete={() => onDelete(element)}
              onEdit={()=>onEdit(element)}
            />
          );
        })}
      </div>
    </div>
  );
};
