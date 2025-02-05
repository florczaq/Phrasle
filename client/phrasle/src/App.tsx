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
import { GroupList } from './components/GroupList/GroupList';
import { MemoryGameSettings } from './components/MemoryGame/MemorySettings/MemoryGameSettings';

// Represents a phrase with its attributes
/**
 * Interface for a phrase.
 * @property {number} [id] - Optional unique identifier for the phrase.
 * @property {string} value - The text of the phrase.
 * @property {string} definition - The definition or meaning of the phrase.
 * @property {boolean} [starred] - Optional flag indicating if the phrase is marked as important or favorite.
 * @property {number} groupId - Identifier for the group to which the phrase belongs.
 */
export interface Phrase {
  id?: number; // Optional unique identifier for the phrase
  value: string; // The text of the phrase
  definition: string; // The definition or meaning of the phrase
  starred?: boolean; // Optional flag indicating if the phrase is marked as important or favorite
  groupId: number; // Identifier for the group to which the phrase belongs
}

// Represents a group with its attributes
/**
 * Interface for a group.
 * @property {number} id - Unique identifier for the group.
 * @property {string} name - Name of the group.
 * @property {string} userId - Identifier for the user who owns the group.
 */
export interface Group {
  id: number; // Unique identifier for the group
  name: string; // Name of the group
  userId: string; // Identifier for the user who owns the group
}

// Represents a user with email and password properties
/**
 * Represents a user.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password (ensure to handle this securely in a real application).
 */
export const User = {
  email: '', // The user's email address
  password: '', // The user's password (ensure to handle this securely in a real application)
};

const Logout = () => {
  const navigate = useNavigate();
  const reload = () => window.location.reload();

  useEffect(() => {
    signOut();
    navigate('/login');
    reload();
  });
  return <></>;
};

const ChangeRoute = ({ path = '' }) => {
  const navigate = useNavigate();
  useEffect(() => navigate(path));
  return <></>;
};

interface AuthenticateOnLoadInterface {
  component: JSX.Element;
}
const AuthenticateOnLoad = ({ component }: AuthenticateOnLoadInterface) => {
  const navigate = useNavigate();
  useEffect(() => {
    !getUserId() && navigate('/login');
  });
  return component;
};
//TODO Error route
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
    path: '/group/list',
    element: <AuthenticateOnLoad component={<GroupList />} />,
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
    path: "/play/memory/settings",
    element: <AuthenticateOnLoad component={<MemoryGameSettings />} />
  },
  {
    path: "/play/memory/game",
    element: <></>
  }
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
