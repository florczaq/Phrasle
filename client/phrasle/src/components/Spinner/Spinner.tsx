import React from 'react'
import "./Spinner.css"


interface SpinnerInterface {
  text?: string
}
export const Spinner = ({ text }: SpinnerInterface) => {
  return (
    <div className='spinnerContainer center'>
      <p> {text ? text : 'Loadinng...'}</p>
    </div>
  )
}
