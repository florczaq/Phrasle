import React, { useEffect, useState } from 'react';
import './ListOfPhrasesPage.css';
import { PhraseList } from './PhraseList/PhraseList';
import { Phrase } from '../../App';
import { getListOfPhrases } from '../../services/phrase';

export const ListOfPhrasesPage = () => {
  const [data, setData] = useState<Phrase[]>([]);
  useEffect(() => {
    getListOfPhrases().then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div
      id='listOfWordsContainer'
      className='center'>
      <div className='list'>
        <PhraseList
          listTitle='Starred'
          data={data.filter((d) => {
            return d.starred;
          })}
        />
        
        <PhraseList
          listTitle='Phrases'
          data={data.filter((d) => {
            return !d.starred;
          })}
        />
      </div>
    </div>
  );
};
