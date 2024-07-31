/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { getAmountOfPhrases } from '../../services/phrase';
import { finishQuizAndClearRecord, getCorrectAnswer, getNewQuizSet } from '../../services/quiz';
import { Quiz } from './Quiz/Quiz';
import './QuizPage.css';

interface NextQuizButtonParams {
  onClick: () => void;
  finish: boolean;
}

const NextQuestionButton = ({ onClick, finish }: NextQuizButtonParams) => {
  return (
    <button
      className='nextQuestionButton'
      onClick={onClick}>
      {finish ? 'Finish' : 'Next'}
    </button>
  );
};

//TODO confirmation on reload
export const QuizPage = () => {
  const [gameId, setGameId] = useState<number>();
  const [question, setQuestion] = useState<string>('');
  const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);
  const [avaibleAnswers, setAvaibleAnswers] = useState<Array<string>>([]);
  const [questionCounter, setQuestionCounter] = useState<number>(1);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<Phrase>({ value: '', definition: '' });
  const [finish, setFinish] = useState<boolean>(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  const pickNewSet = () => {
    getNewQuizSet()
      .then((response) => {
        if (response.status === 204) {
          alert('No more words');
          return;
        }
        setGameId(response.data.gameId);
        setQuestion(response.data.question);
        setAvaibleAnswers(response.data.answers);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setFinish(false);
    finishQuizAndClearRecord()
      .then(() =>
        getAmountOfPhrases()
          .then((r) => setNumberOfQuestions(r.data - 3))
          .then(() => pickNewSet())
      )
      .catch((err) => console.error(err.message));
  }, []);

  const goNext = () => {
    setQuestionAnswered(false);
    pickNewSet();
    setQuestionCounter((prev) => prev + 1);
  };

  const onAnswer = (pickedAnswer: string) => {
    getCorrectAnswer(gameId)
      .then((response) => {
        setCorrectAnswer(response.data);
        if (pickedAnswer === response.data.definition) 
          setCountCorrectAnswers((prev) => prev + 1);
        setQuestionAnswered(true);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (questionCounter === numberOfQuestions) setFinish(true);
      });
  };

  const onFinish = () => {
    console.log(countCorrectAnswers);
  };

  return (
    <div
      id='quizPageContainer'
      className='center'>
      <div className='questionCounter center'>
        {questionCounter}/{numberOfQuestions}
      </div>
      <Quiz
        answers={avaibleAnswers}
        question={question}
        correctAnswer={correctAnswer.definition}
        onAnswer={onAnswer}
        reveal={questionAnswered}
      />
      {questionAnswered && (
        <NextQuestionButton
          onClick={finish ? onFinish : goNext}
          finish={finish}
        />
      )}
    </div>
  );
};
