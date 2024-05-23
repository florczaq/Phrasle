import { useEffect, useState } from 'react';
import { Box } from '../PhraseBox/Box';
import './Quiz.css';

interface OptionButtonParams {
  text: string;
  onClick: (u: string) => void;
  isCorrect?: boolean | null;
}

const Phrase = {
  phrase: '',
  definition: '',
};

const OptionButton = ({ text, onClick, isCorrect }: OptionButtonParams) => {
  return (
    <button
      className={`center ${isCorrect != null && (isCorrect ? '_correct' : '_incorrect')}`}
      onClick={() => onClick(text)}>
      {text}
    </button>
  );
};

export const Quiz = () => {
  const [answers, setAnswers] = useState<Array<typeof Phrase>>([]);
  const [reveal, setReveal] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<typeof Phrase>(Phrase);
  const [data] = useState<Array<{ phrase: string; definition: string }>>([
    { phrase: 'Apple', definition: 'Not orange' },
    { phrase: 'Pear', definition: 'Not an apple or oragne' },
    { phrase: 'Orange', definition: 'Not apple' },
    { phrase: 'Strawberry', definition: 'Neither of those above' },
  ]);

  const pickNewPhrase = (): typeof Phrase => {
    let index: number;
    do index = Math.floor(Math.random() * data.length);
    while (data[index].phrase === correctAnswer.phrase);
    setCorrectAnswer(data[index]);
    return data[index];
  };

  const pickWrongAnswers = (correctAnswer: typeof Phrase) => {
    let pickedDefinitions: Set<typeof Phrase> = new Set<typeof Phrase>().add(correctAnswer);
    do pickedDefinitions.add(data[Math.floor(Math.random() * data.length)]);
    while (pickedDefinitions.size < 4);
    setAnswers(shuffle(Array.from(pickedDefinitions)));
  };

  const pickNewSet = () => {
    if (data.length >= 4) {
      pickWrongAnswers(pickNewPhrase());
    }
  };

  const shuffle = (array: Array<typeof Phrase>): Array<typeof Phrase> => {
    let randomIndex;
    for (let i = 0; i < array.length; i++) {
      randomIndex = Math.floor(Math.random() * array.length);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };

  useEffect(() => {
    pickNewSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAnswerPick = (userAnswer: string) => {
    setReveal(true);
  };

  return (
    <div
      id='quizContainer'
      className='center'>
      <div className='boxContainer'>
        <Box phrase={correctAnswer.phrase || ' '} />
      </div>
      <div className='optionButtonContainer center'>
        <OptionButton
          text={answers[0]?.definition || ''}
          onClick={onAnswerPick}
          isCorrect={reveal ? answers[0] === correctAnswer : null}
        />
        <OptionButton
          text={answers[1]?.definition || ''}
          onClick={onAnswerPick}
          isCorrect={reveal ? answers[1] === correctAnswer : null}

        />
        <OptionButton
          text={answers[2]?.definition || ''}
          onClick={onAnswerPick}
          isCorrect={reveal ? answers[2] === correctAnswer : null}

        />
        <OptionButton
          text={answers[3]?.definition || ''}
          onClick={onAnswerPick}
          isCorrect={reveal ? answers[3] === correctAnswer : null}

        />
      </div>
    </div>
  );
};
