import React from 'react'
import "./PhraseBox.css"

interface PhraseBoxParams {
  text: string
  definition: string
  onDelete: ()=>void
}

export const PhraseBox = ({ text, definition, onDelete }: PhraseBoxParams) => {
  

  return (
    <div className="phraseBoxContainer center">
      <div className='phraseBox center'>
        <p className='text center'>{text}</p>
        <p className='definition center'>{definition}</p>
      </div>
      <div className="buttons center">
        <button className='editButton'>Edit</button>
        <button className='deleteButton' onClick={()=>onDelete()}>Delete</button>
      </div>
    </div>
  )
}
