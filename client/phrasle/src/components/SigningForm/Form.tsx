import React, { useState } from 'react';
import './Form.css';
import { User } from '../../App';

export interface FormParams {
  title: string;
  register?: boolean;
  onSubmit: (credentials: typeof User) => void;
}

export const Form = ({ title, register, onSubmit }: FormParams) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (text: string) => {
    return text
      .toLocaleLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validate = () => {
    if (email === '' || password === '') {
      setErrorMessage('Fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Type correct email format');
      return;
    }

    onSubmit({ email, password });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage !== null) setErrorMessage(null);
    const element = e.target.classList.toString();
    if (element.includes('email')) setEmail(e.target.value);
    if (element.includes('password')) setPassword(e.target.value);
    if (element.includes('repeatPassword')) setRepeatPassword(e.target.value);
  };

  return (
    <div
      id='formContainer'
      className='center'>
      <form className='center'>
        <h2 className='center'>{title}</h2>
        <div className='fields'>
          <input
            className='emailField'
            type='email'
            value={email}
            onChange={(e) => handleInput(e)}
            placeholder='Email...'
            required
          />

          <input
            className='passwordField'
            type='password'
            value={password}
            onChange={(e) => handleInput(e)}
            placeholder='Password...'
            required
          />

          {register ? (
            <input
              className='repeatPasswordField'
              type='password'
              placeholder='Repeat password...'
              value={repeatPassword}
              onChange={(e) => handleInput(e)}
            />
          ) : (
            <div className='stayLoggedIn center'>
              <input
                type='checkbox'
                name=''
                className='css-checkbox'
                id='stayLogged_box'
              />
              <p>Stay logged in</p>
            </div>
          )}
          <p className='alert center'>{errorMessage || ''}</p>
        </div>

        <button
          type='button'
          className='confirmButton'
          onClick={() => validate()}>
          {register ? 'Sign Up' : 'Sign In'}
        </button>

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
