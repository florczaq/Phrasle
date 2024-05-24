import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { PhraseLearn } from './components/LearnPhrasePage/LearnPhrase';
import { QuizPage } from './components/QuizPage/QuizPage';
import { Form } from './components/SigningForm/Form';
import { TopBar } from './components/TopBar/TopBar';

export const Phrase = {
  phrase: '',
  definition: '',
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <div></div>,
  },
  {
    path: '/login',
    element: (
      <div
        className='center'
        style={{ height: '90vh' }}>
        <Form title='You are signing in!' />
      </div>
    ),
  },
  {
    path: '/register',
    element: (
      <div
        className='center'
        style={{ height: '90vh' }}>
        <Form
          title='You are signing up!'
          register
        />
      </div>
    ),
  },
  {
    path: '/phrase',
    element: <PhraseLearn />,
  },
  {
    path: '/quiz',
    element: <QuizPage />,
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
