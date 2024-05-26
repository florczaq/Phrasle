import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { PhraseLearn } from './components/LearnPhrasePage/LearnPhrase';
import { ListOfPhrasesPage } from './components/ListOfPhrasesPage/ListOfPhrasesPage';
import { QuizPage } from './components/QuizPage/QuizPage';
import { SignInPage } from './components/SignInPage/SignInPage';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import { TopBar } from './components/TopBar/TopBar';

export const Phrase = {
  phrase: '',
  definition: '',
};

export const User = {
  email: '',
  password: '',
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <div></div>,
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
]);

function App() {
  return (
    <div className='App'>
      <div id='topBarContainser'>
        <TopBar />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
