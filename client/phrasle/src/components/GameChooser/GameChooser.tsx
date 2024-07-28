import { NavigateFunction, useNavigate } from 'react-router-dom';
import './GameChooser.css';

interface GameBoxInterface {
  name: string;
  path: string;
  navigation: NavigateFunction;
}

const GameBox = ({ name, path, navigation }: GameBoxInterface) => {
  const OnClick = () => {navigation(path); console.log("123");};
  return (
    <div className='gameBox center' onClick={() => OnClick()}>
      <p className='name'>{name}</p>
    </div>
  );
};

export const GameChooser = () => {
  const navigation = useNavigate();
  return (
    <div className='gameBoxContainer'>
      <GameBox
        name='Quiz'
        path='/play/quiz'
        navigation={navigation}
      />
      <GameBox
        name='2'
        path='/play'
        navigation={navigation}
      />
      <GameBox
        name='3'
        path='/play'
        navigation={navigation}
      />
      <GameBox
        name='4'
        path='/play'
        navigation={navigation}
      />
    </div>
  );
};
