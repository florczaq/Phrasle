import React from 'react'
import "./ListOfPhrasesPage.css"
import { PhraseList } from './PhraseList/PhraseList'

export const ListOfPhrasesPage = () => {
  return (
    <div id='listOfWordsContainer' className='center'>
      <div className='list'>
        <PhraseList listTitle='Starred'/>
        <PhraseList listTitle='Phrases'/>
      </div>
    </div>
  )
}
