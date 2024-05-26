import React from 'react';
import { Form } from '../SigningForm/Form';
import './SignUpPage.css';
import { User } from '../../App';
import { register } from '../../service';
import { save, KEY, TYPE } from '../../storage';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const onSumbit = (credentials: typeof User) => {
    register(credentials)
      .then((response) => {
        save(TYPE.COOKIE, KEY.UID, response.data.token);
        navigate('/list');
      })
      .catch((response) => console.warn(response.message));
  };

  return (
    <div
      id='signUpContainer'
      className='center'>
      <Form
        title='You are signing up!'
        onSubmit={onSumbit}
        register
      />
    </div>
  );
};
