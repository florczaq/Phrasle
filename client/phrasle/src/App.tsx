import React from 'react';
import './App.css';
import { TopBar } from './components/TopBar/TopBar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'*',
    element: (<div></div>)
  }
]);

function App() {
  return (
    <div className="App">
      <div id='topBarContainser'>
        <TopBar />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
