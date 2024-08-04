import React, { useEffect, useState } from 'react';
import './ListOfPhrasesPage.css';
import { PhraseList } from './PhraseList/PhraseList';
import { Phrase } from '../../App';
import { getListOfPhrases } from '../../services/phrase';
import { get, KEY, TYPE } from '../../storage';

export const ListOfPhrasesPage = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  useEffect(() => {
    if (!get(TYPE.COOKIE, KEY.TOKEN)) return;
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
