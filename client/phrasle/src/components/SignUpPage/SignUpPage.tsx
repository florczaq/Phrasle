import { useNavigate } from 'react-router-dom';
import { User } from '../../App';
import { register } from '../../services/authentication';
import { KEY, TYPE, save } from '../../services/storage';
import { Form } from '../SigningForm/Form';
import './SignUpPage.css';
import { useState } from 'react';

export const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const onSumbit = (credentials: typeof User) => {
    register(credentials)
      .then((response) => {
        save(TYPE.COOKIE, KEY.TOKEN, response.data.token);
        save(TYPE.COOKIE, KEY.UID, response.data.userId);
        navigate('/list');
        window.location.reload();
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
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
