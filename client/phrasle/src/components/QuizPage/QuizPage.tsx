/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { Quiz } from './Quiz/Quiz';
import './QuizPage.css';
import { getNewQuizSet } from '../../services/quiz';

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
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [question, setQuestion] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<Phrase>({ value: '', definition: '' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countCorrectAnswers, setCountCorrectAnswers] = useState<number>(0);

  const pickNewSet = () => {
    getNewQuizSet()
      .then((response) => {
        console.log(response.status, response.data);
        if (response.status === 204) {
          alert('No more words');
          return;
        }
        setQuestion(response.data.question);
        setAnswers(response.data.answers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   pickNewSet()
  //   console.log();
  // }, []);

  const goNext = () => {
    setAnswered(false);
    pickNewSet();
    setQuestionCounter((prev) => prev + 1);
  };

  const onAnswer = (pickedAnswer: string) => {
    setAnswered(true);
    if (pickedAnswer === correctAnswer.definition) setCountCorrectAnswers((prev) => prev + 1);
  };

  return (
    <div
      id='quizPageContainer'
      className='center'
    >
      <div className='questionCounter center'>{questionCounter}/10</div>
      <Quiz
        answers={answers}
        question={question}
        correctAnswer={correctAnswer.definition}
        onAnswer={onAnswer}
        reveal={answered}
      />
      {answered && <NextQuizButton onClick={goNext} />}
    </div>
  );
};
