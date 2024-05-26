import React, { useState } from 'react';
import './Form.css';
import { User } from '../../App';

export interface FormParams {
  title: string;
  register?: boolean;
  onSubmit: (credentials: typeof User) => void;
}

export const Form = ({ title, register, onSubmit }: FormParams) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");


  return (
    <div
      id='formContainer'
      className='center'>
      <form className='center'>
        <h2 className='center'>{title}</h2>
        <div className='fields'>

          <input
            className='usernameField'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email...'
            required
          />
          <input
            className='passwordField'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password...'
            required
          />
          {register && (
            <input
              className='passwordField'
              type='password'
              placeholder='Repeat password...'
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
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
        <button type='button' className='confirmButton' onClick={() => onSubmit({ email, password })}>Sign In</button>

        {!register ? (
          <p className='signUpMessage'>
            Don't have an account? <a href='/register'>Sign Up</a>
          </p>
        ) : (
          <p className='signUpMessage'>
            Already have an account? <a href='/login'>Sign In</a>
          </p>
        )}
      </form>
    </div>
  );
};
