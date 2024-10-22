import { useNavigate } from 'react-router-dom';
import { User } from '../../App';
import { authenticate } from '../../services/authentication';
import { KEY, TYPE, save } from '../../services/storage';
import { Form } from '../SigningForm/Form';
import './SignInPage.css';
import { useState } from 'react';

export const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const onSumbit = (credentials: typeof User) => {
    authenticate(credentials)
      .then((response) => {
        save(TYPE.COOKIE, KEY.TOKEN, response.data.token);
        save(TYPE.COOKIE, KEY.UID, response.data.userId);
        navigate('/list');
        window.location.reload();
      })
      .catch((err) => {
        const response: string = err.response.data.errorMessage || "";
        if (response.indexOf('email') !== -1) setErrorMessage(response);
        else setErrorMessage('Bad credentials');
      });
  };
  //TODO stay logged in
  return (
    <div
      id='signInContainer'
      className='center'>
      <Form
        title='You are signing in!'
        onSubmit={onSumbit}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
