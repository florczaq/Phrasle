import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import { AddPhrasePage } from './components/AddPhrasePage/AddPhrasePage';
import { GameChooser } from './components/GameChooser/GameChooser';
import { PhraseLearn } from './components/LearnPhrasePage/LearnPhrase';
import { ListOfPhrasesPage } from './components/ListOfPhrasesPage/ListOfPhrasesPage';
import { NoConnection } from './components/NoConnectionScreen/NoConnection';
import { QuizPage } from './components/QuizPage/QuizPage';
import { SignInPage } from './components/SignInPage/SignInPage';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import { Spinner } from './components/Spinner/Spinner';
import { TopBar } from './components/TopBar/TopBar';
import { testServerConnection } from './services/connection';
import { KEY, TYPE, get, remove } from './storage';

export interface Phrase {
  value: string;
  definition: string;
  starred?: boolean;
}

export const User = {
  email: '',
  password: '',
};

const Logout = () => {
  const navigate = useNavigate();
  const reload = () => window.location.reload();

  useEffect(() => {
    remove(TYPE.COOKIE, KEY.TOKEN);
    remove(TYPE.COOKIE, KEY.UID);
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
    !get(TYPE.COOKIE, KEY.UID) && navigate('/login');
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
    path: '/phrase',
    element: <AuthenticateOnLoad component={<PhraseLearn />} />,
  },
  {
    path: '/list',
    element: <AuthenticateOnLoad component={<ListOfPhrasesPage />} />,
  },
  {
    path: '/add',
    element: <AuthenticateOnLoad component={<AddPhrasePage />} />,
  },
  {
    path: '/play',
    element: <AuthenticateOnLoad component={<GameChooser />} />,
  },
  {
    path: '/play/quiz',
    element: <AuthenticateOnLoad component={<QuizPage />} />,
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
