import React from 'react';
import './App.css';
import { TopBar } from './components/TopBar/TopBar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Form } from './components/SigningForm/Form';
import { Box } from './components/PhraseLearnBox/Box';
import { PhraseLearn } from './components/PhraseLearnBox/PhraseLearn';

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
