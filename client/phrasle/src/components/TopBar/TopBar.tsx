import React, { useEffect, useState } from 'react';
import './TopBar.css';
import { KEY, TYPE, get } from '../../storage';

export const TopBar = () => {
  const [signIn, setSignIn] = useState<boolean>(true);

  useEffect(() => {
    setSignIn(get(TYPE.COOKIE, KEY.TOKEN) === null)
    console.log(get(TYPE.COOKIE, KEY.TOKEN));
  }, []);

  return (
    <div
      id='topBar'
      className='center'>
      <div className='name'>
        <label>PHRASLE</label>
      </div>
      <ul className='center'>
        <ol className='center'>
          <a
            href='/add'
            className='center'>
            <label>Add</label>
          </a>
        </ol>
        <ol className='center'>
          <a
            href='*'
            className='center'>
            <label>Play</label>
          </a>
        </ol>
        <ol className='center'>
          <a
            href='/list'
            className='center'>
            <label>List</label>
          </a>
        </ol>
        <ol className='center'>
          {signIn ? (
            <a
              href='/login'
              className='center'>
              <label>Sign In</label>
            </a>
          ) : (
            <a className='center' href='/logout'>Sign Out</a>
          )}
        </ol>
      </ul>
    </div>
  );
};
