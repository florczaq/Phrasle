import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import { AddPhrasePage } from './components/PhraseForm/PhraseForm';
import { GamesMenu } from './components/GamesMenu/GamesMenu';
import { Flashcards } from './components/Flashcards/Flashcards';
import { List } from './components/List/List';
import { NoConnection } from './components/NoConnectionScreen/NoConnection';
import { QuizPage } from './components/QuizPage/QuizPage';
import { QuizSettings } from './components/QuizPage/QuizSettings/QuizSettings';
import { ScoreWindow } from './components/ScoreWindow/ScoreWindow';
import { SignInPage } from './components/SignInPage/SignInPage';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import { Spinner } from './components/Spinner/Spinner';
import { TopBar } from './components/TopBar/TopBar';
import { getUserId, signOut } from './services/authentication';
import { testServerConnection } from './services/connection';

export interface Phrase {
  id?: number;
  value: string;
  definition: string;
  starred?: boolean;
  groupId: number;
}

export interface Group{
  id: number;
  name: string;
  userId: string;
}

export const User = {
  email: '',
  password: '',
};

const Logout = () => {
  const navigate = useNavigate();
  const reload = () => window.location.reload();

  useEffect(() => {
    signOut();
    navigate('/login');
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

const ChangeRoute = ({ path = '' }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

interface AuthenticateOnLoadInterface {
  component: JSX.Element;
}
const AuthenticateOnLoad = ({ component }: AuthenticateOnLoadInterface) => {
  const navigate = useNavigate();
  useEffect(() => {
    !getUserId() && navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return component;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChangeRoute path={'list'} />,
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
    path: '/logout',
    element: <Logout />,
  },
  //REQUIRE AUTHENTICATION//
  {
    path: '/phrases',
    element: <AuthenticateOnLoad component={<Flashcards />} />,
  },
  {
    path: '/list',
    element: <AuthenticateOnLoad component={<List />} />,
  },
  {
    path: '/phraseForm',
    element: <AuthenticateOnLoad component={<AddPhrasePage />} />,
  },
  {
    path: '/play',
    element: <AuthenticateOnLoad component={<GamesMenu />} />,
  },
  {
    path: '/play/score',
    element: <AuthenticateOnLoad component={<ScoreWindow />} />,
  },
  {
    path: '/play/quiz/game',
    element: <AuthenticateOnLoad component={<QuizPage />} />,
  },
  {
    path: '/play/quiz/settings',
    element: <AuthenticateOnLoad component={<QuizSettings />} />,
  },
  {
    path: '/play/quiz/settings',
    element: <AuthenticateOnLoad component={<QuizSettings />} />,
  },
]);

function App() {
  const [connectionEstablished, setConnectionStatus] = useState<boolean>(true);
  const [spinnerVisible, setSpinnerVisibile] = useState<boolean>(true);

  useEffect(() => {
    testServerConnection()
      .catch(() => setConnectionStatus(false))
      .finally(() => setSpinnerVisibile(false));
  }, []);

  return (
    <div className='App'>
      {spinnerVisible && <Spinner text='Connecting to server...' />}
      {connectionEstablished ? (
        <>
          <div id='topBarContainer'>
            <TopBar />
          </div>
          <RouterProvider router={router} />
        </>
      ) : (
        <NoConnection />
      )}
    </div>
  );
}

export default App;
