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
//   </a>
// </ol>
// <ol className='center'>
//   <a
//     href='/phrases'
//     className='center'>
//     <label>Cards</label>
//   </a>
// </ol>
// <ol className='center'>
//   <a
//     href='/play'
//     className='center'>
//     <label>Play</label>
//   </a>
// </ol>
// <ol className='center'>
//   <a
//     href='/list'
//     className='center'>
//     <label>List</label>
//   </a>
// </ol>
// <ol className='center'>
//   <a
//     className='center'
//     href='/logout'>
//     Sign Out
//   </a>
// </ol>

const UnauthenticatedUserOptions = [
  { href: '/login', label: 'Sign In' },
]

//   return (
//     <>
//       <ol className='center'>
//         <a
//           href='/login'
//           className='center'>
//           <label>Sign In</label>
//         </a>
//       </ol>
//     </>
//   );
// };

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
      <SlideMenu options={ AuthenticatedUserOptions}/>
    </div>
  );
};
