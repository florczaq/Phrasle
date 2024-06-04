import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import { PhraseLearn } from './components/LearnPhrasePage/LearnPhrase';
import { ListOfPhrasesPage } from './components/ListOfPhrasesPage/ListOfPhrasesPage';
import { QuizPage } from './components/QuizPage/QuizPage';
import { SignInPage } from './components/SignInPage/SignInPage';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import { TopBar } from './components/TopBar/TopBar';
import { AddPhrasePage } from './components/AddPhrasePage/AddPhrasePage';
import { KEY, TYPE, get, remove } from './storage';
import { useEffect } from 'react';

export interface Phrase {
  value: string,
  definition: string,
  starred?: boolean
};

export const User = {
  email: '',
  password: '',
};

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    remove(TYPE.COOKIE, KEY.TOKEN);
    remove(TYPE.COOKIE, KEY.UID);
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

const OnLoad = () => {
  const navigate = useNavigate();
  useEffect(() => {
    get(TYPE.COOKIE, KEY.UID) ?
      navigate('/list') :
      navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <OnLoad />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/register',
    element: <SignUpPage />,
  },
  {
    path: '/phrase',
    element: <PhraseLearn />,
  },
  {
    path: '/quiz',
    element: <QuizPage />,
  },
  {
    path: '/list',
    element: <ListOfPhrasesPage />,
  },
  {
    path: '/add',
    element: <AddPhrasePage />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
]);

function App() {
  return (
    <div className='App'>
      <div id='topBarContainer'>
        <TopBar />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
