import { useEffect } from 'react';
import { getToken } from '../../services/authentication';
import './TopBar.css';
import { SlideMenu } from '../SlideMenu/SlideMenu';

export type MenuOption =
  | { href: string; label: string }
  | {
      name: string;
      data: { href: string; label: string }[];
    };

const AuthenticatedUserOptions: MenuOption[][] = [
  [
    {
      name: 'Phrase',
      data: [
        { href: '/phrases', label: 'Flashcards' },
        { href: '/phraseForm?m=add', label: 'Add' },
        { href: '/list', label: 'List' },
      ],
    },
  ],
  [
    {
      name: 'Group',
      data: [
        { href: '/', label: 'Add' },
        { href: '/', label: 'List' },
      ],
    },
  ],
  [
    {
      name: 'Games', //TODO transform page into menu options
      data: [{ href: '/play', label: 'Game menu' }],
    },
  ],
  [
    {
      name: 'Account',
      data: [{ href: '/logout', label: 'Sign Out' }],
    },
  ],
];

const UnauthenticatedUserOptions: MenuOption[][] = [[{ href: '/login', label: 'Sign In' }]];

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
      <SlideMenu options={getToken() ? AuthenticatedUserOptions : UnauthenticatedUserOptions} />
    </div>
  );
};
