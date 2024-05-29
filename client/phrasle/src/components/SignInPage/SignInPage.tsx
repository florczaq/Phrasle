import { useNavigate } from 'react-router-dom';
import { User } from '../../App';
import { authenticate } from '../../services/authentication';
import { KEY, TYPE, save } from '../../storage';
import { Form } from '../SigningForm/Form';
import './SignInPage.css';

export const SignInPage = () => {
  const navigate = useNavigate();

  const onSumbit = (credentials: typeof User) => {
    authenticate(credentials)
      .then((response) => {
        save(TYPE.COOKIE, KEY.TOKEN, response.data.token);
        save(TYPE.COOKIE, KEY.UID, response.data.userId);
        navigate("/list");
        window.location.reload();
      })
      .catch((response) => console.warn(response.message));
  };

  return (
    <div
      id='signInContainer'
      className='center'>
      <Form
        title='You are signing in!'
        onSubmit={onSumbit}
      />
    </div>
  );
};
