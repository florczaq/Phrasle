import { NavigateFunction, useNavigate } from 'react-router-dom';
import './GamesMenu.css';

interface GameBoxInterface {
  name: string;
  path: string;
  navigation: NavigateFunction;
}

const GameBox = ({ name, path, navigation }: GameBoxInterface) => {
  const OnClick = () => navigation(path);

  return (
    <div
      className='gameBox center'
      onClick={() => OnClick()}>
      <p className='name'>{name}</p>
    </div>
  );
};

export const GamesMenu = () => {
  const navigation = useNavigate();
  return (
    <div className='gameBoxContainer'>
      <GameBox
        name='Quiz'
        path='/play/quiz/settings'
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
