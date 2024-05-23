import { useEffect, useState } from 'react';
import { Box } from '../PhraseBox/Box';
import './Quiz.css';

interface OptionButtonParams {
  text: string;
}

const Phrase = {
  phrase: '',
  definition: '',
};

const OptionButton = ({ text }: OptionButtonParams) => {
  return <button className='center'>{text}</button>;
};

export const Quiz = () => {
  const [answers, setAnswers] = useState<Array<typeof Phrase>>([]);
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
    setAnswers(Array.from(pickedDefinitions));
  };

  const pickNewSet = () => {
    if (data.length >= 4) {
      pickWrongAnswers(pickNewPhrase());
    }
  };

  useEffect(() => {
    pickNewSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id='quizContainer'
      className='center'>
      <Box phrase={correctAnswer.phrase || ' '} />
      <div className='optionButtonContainer center'>
        <OptionButton text={answers[0]?.definition || ''} />
        <OptionButton text={answers[1]?.definition || ''} />
        <OptionButton text={answers[2]?.definition || ''} />
        <OptionButton text={answers[3]?.definition || ''} />
      </div>
    </div>
  );
};
