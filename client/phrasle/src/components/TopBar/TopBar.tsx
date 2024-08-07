import { useEffect } from 'react';
import { getToken } from '../../services/authentication';
import './TopBar.css';

export const TopBar = () => {
  useEffect(() => {
    console.log(getToken());
  }, []);

  return (
    <div
      id='topBar'
      className='center'>
      <div className='name'>
        <label>PHRASLE</label>
      </div>
      <ul className='center'>
        {getToken()? (
          <>
            <ol className='center'>
              <a
                href='/add'
                className='center'>
                <label>Add</label>
              </a>
            </ol>
            <ol className='center'>
              <a
                href='/phrases'
                className='center'>
                <label>Cards</label>
              </a>
            </ol>
            <ol className='center'>
              <a
                href='/play'
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
              <a
                className='center'
                href='/logout'>
                Sign Out
              </a>
            </ol>
          </>
        ) : (
          <ol className='center'>
            <a
              href='/login'
              className='center'>
              <label>Sign In</label>
            </a>
          </ol>
        )}
      </ul>
    </div>
  );
};
