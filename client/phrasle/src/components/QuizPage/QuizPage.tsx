/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { finishQuizAndClearRecord, getCorrectAnswer, getNewQuizSet } from '../../services/quiz';
import { Quiz } from './Quiz/Quiz';
import './QuizPage.css';
import { getAmountOfUserPhrases } from '../../services/phrase';
import { createKeywordTypeNode } from 'typescript';

interface NextQuizButtonParams {
  onClick: () => void;
  finish: boolean;
  onFinish: () => void;
}

//TODO change button text and functionality to FINISH when answered 10 questions
const NextQuizButton = ({ onClick, finish, onFinish }: NextQuizButtonParams) => {
  return (
    <button
      className='nextQuizButton'
      onClick={finish ? onFinish : onClick}>
      {finish ? 'Finish' : 'Next'}
    </button>
  );
};

export const QuizPage = () => {
  const [gameId, setGameId] = useState<number>();
  const [question, setQuestion] = useState<string>('');
  const [answered, setAnswered] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [questionCounter, setQuestionCounter] = useState<number>(1);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<Phrase>({ value: '', definition: '' });
  const [finish, setFinish] = useState<boolean>(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  const pickNewSet = () => {
    getNewQuizSet()
      .then((response) => {
        // console.log(response.status, response.data);
        if (response.status === 204) {
          alert('No more words');
          return;
        }
        setQuestion(response.data.question);
        setAnswers(response.data.answers);
        setGameId(response.data.gameId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setFinish(false);
    finishQuizAndClearRecord()
      .then((r) => {
        // console.log(r);
        getAmountOfUserPhrases()
          .then((r) => {
            // console.log(r.data);
            setNumberOfQuestions(r.data - 3)})
          .then(() => pickNewSet())
      }
      )
      .catch((err) => console.error(err.message));
  }, []);

  const goNext = () => {
    setAnswered(false);
    if(questionCounter === numberOfQuestions){
      setFinish(true);
      return;
    }
    pickNewSet();
    setQuestionCounter((prev) => prev + 1);
  };

  const onAnswer = (pickedAnswer: string) => {
    getCorrectAnswer(gameId)
      .then((response) => {
        setCorrectAnswer(response.data);
        if (pickedAnswer === response.data.definition) setCountCorrectAnswers((prev) => prev + 1);
        setAnswered(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = () => {console.log(countCorrectAnswers);};

  return (
    <div
      id='quizPageContainer'
      className='center'>
      <div className='questionCounter center'>{questionCounter}/{numberOfQuestions}</div>
      <Quiz
        answers={answers}
        question={question}
        correctAnswer={correctAnswer.definition}
        onAnswer={onAnswer}
        reveal={answered}
      />
      {answered && (
        <NextQuizButton
          onClick={goNext}
          onFinish={onFinish}
          finish={finish}
        />
      )}
    </div>
  );
};
