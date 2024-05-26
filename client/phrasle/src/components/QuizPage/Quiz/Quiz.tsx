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
  onAnswer: (pickedAnswer: Phrase) => void;
  reveal: boolean;
  correctAnswer: Phrase;
  answers: Array<Phrase>;
}

export const Quiz = ({ answers, reveal, correctAnswer, onAnswer }: QuizParams) => {
  return (
    <div
      id='quizContainer'
      className='center'>
      <div className='boxContainer'>
        <Box phrase={correctAnswer.value || ' '} />
      </div>

      <div className='optionButtonContainer center'>
        {answers.map((element, i) => (
          <OptionButton
            key={i}
            text={element?.definition || ''}
            onClick={() => onAnswer(element)}
            isCorrect={reveal ? element === correctAnswer : null}
          />
        ))}
      </div>
    </div>
  );
};
