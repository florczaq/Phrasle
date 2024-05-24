/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { Quiz } from './Quiz/Quiz';
import './QuizPage.css';

interface NextQuizButtonParams {
  onClick: () => void;
}

//TODO change button text and functionality to FINISH when answered 10 questions 
const NextQuizButton = ({ onClick }: NextQuizButtonParams) => {
  return (
    <button
      className='nextQuizButton'
      onClick={onClick}>
      {'Next'}
    </button>
  );
};

export const QuizPage = () => {
  const [questionCounter, setQuestionCounter] = useState<number>(1);
  const [answered, setAnswered] = useState<boolean>(false);
  //TODO fetch from server
  const [data] = useState<Array<{ phrase: string; definition: string }>>([
    { phrase: 'Apple', definition: '1 Not orange' },
    { phrase: 'Orange', definition: '2 Not apple' },
    { phrase: 'Pear', definition: '3 Not an apple or orange' },
    { phrase: 'Strawberry', definition: '4 Neither of those above' },
  ]);

  const [answers, setAnswers] = useState<Array<typeof Phrase>>([]);
  const [correctAnswer, setCorrectAnswer] = useState<typeof Phrase>(Phrase);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countCorrectAnswers, setCountCorrectAnswers] = useState<number>(0);

  const pickNewPhrase = (): typeof Phrase => {
    let set = new Set<typeof Phrase>().add(correctAnswer);
    let index: number;

    do {
      index = Math.floor(Math.random() * data.length);
      set.add(data[index]);
    } while (set.size < 2);
    setCorrectAnswer(data[index]);

    return data[index];
  };

  const pickWrongAnswers = (correctAnswer: typeof Phrase) => {
    let pickedDefinitions: Set<typeof Phrase> = new Set<typeof Phrase>().add(correctAnswer);

    do pickedDefinitions.add(data[Math.floor(Math.random() * data.length)]);
    while (pickedDefinitions.size < 4);

    setAnswers(shuffle(shuffle(Array.from(pickedDefinitions))));
  };

  const pickNewSet = () => {
    if (data.length >= 4) pickWrongAnswers(pickNewPhrase());
    //TODO message when length is less than 4
  };

  const shuffle = (array: Array<typeof Phrase>): Array<typeof Phrase> => {
    let randomIndex: number;
    array.forEach((e, i) => {
      randomIndex = Math.floor(Math.random() * array.length);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    });
    return array;
  };

  useEffect(() => {
    pickNewSet();
  }, []);

  const goNext = () => {
    setAnswered(false);
    pickNewSet();
    setQuestionCounter((prev) => prev + 1);
  };

  const onAnswer = (pickedAnswer: typeof Phrase) => {
    setAnswered(true);
    if (pickedAnswer.definition === correctAnswer.definition)
      setCountCorrectAnswers((prev) => prev + 1);
  };

  return (
    <div
      id='quizPageContainer'
      className='center'>
      <div className='questionCounter center'>{questionCounter}/10</div>
      <Quiz
        answers={answers}
        correctAnswer={correctAnswer}
        onAnswer={onAnswer}
        reveal={answered}
      />
      {answered && <NextQuizButton onClick={goNext} />}
    </div>
  );
};
