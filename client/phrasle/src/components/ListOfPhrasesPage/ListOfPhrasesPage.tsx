import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { getToken } from '../../services/authentication';
import { getListOfPhrases } from '../../services/phrase';
import './ListOfPhrasesPage.css';
import { PhraseList } from './PhraseList/PhraseList';

export const ListOfPhrasesPage = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  useEffect(() => {
    if (!getToken()) return;
    getListOfPhrases().then((res) => {
      setPhrases(res.data);
    });
  }, []);

  return (
    <div
      id='listOfWordsContainer'
      className='center'>
      <div className='list'>
        <PhraseList
          listTitle='Starred'
          phrases={phrases.filter((phrase) => phrase.starred)}
        />

        <PhraseList
          listTitle='Phrases'
          phrases={phrases.filter((phrase) => !phrase.starred)}
        />
      </div>
    </div>
  );
};
