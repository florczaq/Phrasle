import { useEffect } from 'react';
import { getToken } from '../../services/authentication';
import './TopBar.css';
import { SlideMenu } from '../SlideMenu/SlideMenu';

const AuthenticatedUserOptions = [
  { href: '/phraseForm?m=add', label: 'Add Phrase' },
  { href: '/phrases', label: 'Flashcards' },
  { href: '/play', label: 'Game menu' },
  { href: '/list', label: 'List' },
  { href: '/logout', label: 'Sign Out' },
];

const UnauthenticatedUserOptions = [
  { href: '/login', label: 'Sign In' },
]


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
      <SlideMenu options={getToken() ? AuthenticatedUserOptions : UnauthenticatedUserOptions}/>
    </div>
  );
};
