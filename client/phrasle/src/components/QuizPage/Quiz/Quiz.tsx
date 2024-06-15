import { Phrase } from '../../../App';
import { Box } from '../../PhraseBox/Box';
import './Quiz.css';

interface OptionButtonParams {
  text: string;
  onClick: (u: string) => void;
  isCorrect?: boolean | null;
}

const OptionButton = ({ text, onClick, isCorrect }: OptionButtonParams) => {
  return (
    <button
      className={`center${isCorrect != null ? (isCorrect ? ' _correct' : ' _incorrect') : ''}`}
      onClick={() => onClick(text)}>
      {text}
    </button>
  );
};

interface QuizParams {
  onAnswer: (pickedAnswer: string) => void;
  reveal: boolean;
  correctAnswer: string;
  answers: Array<string>;
  question: string;
}

export const Quiz = ({ answers, reveal, question, onAnswer, correctAnswer }: QuizParams) => {
  return (
    <div
      id='quizContainer'
      className='center'>
      <div
        className='boxContainer'
        children={<Box value={question || ' '} definition='' />}
      />
      <div
        className='optionButtonContainer center'
        children={
          answers.map(
            (element, i) =>
              <OptionButton
                key={i}
                text={element || ''}
                onClick={() => onAnswer(element)}
                isCorrect={reveal ? element === correctAnswer : null}
              />
          )}
      />
    </div>
  );
};
