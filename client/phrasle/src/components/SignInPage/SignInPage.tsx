import { User } from '../../App';
import { authenticate } from '../../service';
import { KEY, TYPE, save } from '../../storage';
import { Form } from '../SigningForm/Form';
import './SignInPage.css';

export const SignInPage = () => {
  const onSumbit = (credentials: typeof User) => {
    authenticate(credentials)
      .then((response) => save(TYPE.COOKIE, KEY.UID, response.data.token))
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
