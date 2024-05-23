import React from 'react';
import './Form.css';

export interface FormParams {
  title: string;
  register?: boolean;
}

export const Form = ({ title, register }: FormParams) => {
  return (
    <div
      id='formContainer'
      className='center'>
      <h2 className='center'>{title}</h2>
      <div className='fields'>
        <input
          className='usernameField'
          type='text'
          placeholder='Username'
        />
        <input
          className='passwordField'
          type='password'
          placeholder='Password'
        />
        {register && (
          <input
            className='passwordField'
            type='password'
            placeholder='Repeat password'
          />
        )}
      </div>
      {!register && (
        <div className='stayLoggedIn center'>
          <input
            type='checkbox'
            name=''
            id='stayLogged_box'
          />
          <p>Stay logged in</p>
        </div>
      )}
      <button className='confirmButton'>Sign In</button>

      {!register ? (
        <p className='signUpMessage'>
          Don't have an account? <a href='/register'>Sign Up</a>
        </p>
      ) : (
        <p className='signUpMessage'>
          Already have an account? <a href='/login'>Sign In</a>
        </p>
      )}
    </div>
  );
};
