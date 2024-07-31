import React from 'react';
import './NoConnection.css';

export const NoConnection = () => {
  return (
    <div className='noConnectionContainer center'>
      We couldn't connect to the server. Try again later.
      <button onClick={() => window.location.reload()}>RETRY</button>
    </div>
  );
};
