/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Phrase } from '../../App';
import { finishQuizAndClearRecord, getCorrectAnswer, getNewQuizSet } from '../../services/quiz';
import { get, KEY, QUIZ, save, TYPE } from '../../services/storage';
import { Quiz } from './Quiz/Quiz';
import './QuizPage.css';
import { useNavigate } from 'react-router-dom';

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
  const [correctAnswer, setCorrectAnswer] = useState<Phrase>({
    value: '',
    definition: '',
    groupId: -1,
  });
  const [finish, setFinish] = useState<boolean>(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  const [groupId, setGroupId] = useState<number>(-1);
  const [starred, setStarred] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const pickNewSet = (gid?: number) => {
    getNewQuizSet(gid || groupId, starred)
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
    const quizData: QUIZ = JSON.parse(get(TYPE.SESSION, KEY.QUIZ) || '{numberOfQuestions: 0}');
    finishQuizAndClearRecord()
      .then(() => {
        setNumberOfQuestions(quizData.numberOfQuestions);
        setGroupId(quizData.groupId);
        setStarred(quizData.starred);
      })
      .then(() => pickNewSet(quizData.groupId))
      .catch((err) => console.error(err.message));
  }, [setNumberOfQuestions]);

  const goNext = () => {
    setQuestionAnswered(false);
    pickNewSet();
    setQuestionCounter((prev) => prev + 1);
  };

  const onAnswer = (pickedAnswer: string) => {
    getCorrectAnswer(gameId)
      .then((response) => {
        setCorrectAnswer(response.data);
        if (pickedAnswer === response.data.definition) setCountCorrectAnswers((prev) => prev + 1);
        setQuestionAnswered(true);
      })
      .catch((error) => console.error(error))
      .finally(() => setFinish(questionCounter === numberOfQuestions));
  };

  const onFinish = () => {
    const quizData: QUIZ = JSON.parse(get(TYPE.SESSION, KEY.QUIZ) || '{numberOfQuestions: 0}');
    quizData.score = countCorrectAnswers;
    save(TYPE.SESSION, KEY.QUIZ, JSON.stringify(quizData));
    navigate('../play/score');
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
