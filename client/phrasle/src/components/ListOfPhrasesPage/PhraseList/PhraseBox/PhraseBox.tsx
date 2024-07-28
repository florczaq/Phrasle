import React from 'react'
import "./PhraseBox.css"

interface PhraseBoxParams {
  text: string
  definition: string
  addDate: Date
  onDelete: ()=>void
}

export const PhraseBox = ({ text, definition, addDate, onDelete }: PhraseBoxParams) => {
  

  return (
    <div className="phraseBoxContainer center">
      <div className='phraseBox center'>
        <p className='text center'>{text}</p>
        <p className='definition center'>{definition}</p>
        <p className='addDate center'>{addDate.toISOString().split('T')[0]}</p>
      </div>
      <div className="buttons center">
        <button className='editButton'>Edit</button>
        <button className='deleteButton' onClick={()=>onDelete()}>Delete</button>
      </div>
    </div>
  )
}
