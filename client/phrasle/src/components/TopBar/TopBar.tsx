import React from 'react';
import './TopBar.css';

export const TopBar = () => {
  return (
    <div id='topBar' className='center'>
      <div className='name'>
        <label>PHRASLE</label>
      </div>
      <ul className='center'>
        <ol className='center'>
          <a
            href='*'
            className='center'>
            <label>Play</label>
          </a>
        </ol>
        <ol className='center'>
          <a
            href='*'
            className='center'>
            <label>List</label>
          </a>
        </ol>
        <ol className='center'>
          <a
            href='*'
            className='center'>
            <label>Sign Out</label>
          </a>
        </ol>
      </ul>
    </div>
  );
};
