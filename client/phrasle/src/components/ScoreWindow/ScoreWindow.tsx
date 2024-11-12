import React, { useEffect, useState } from 'react';
import './ScoreWindow.css';
import { get, KEY, QUIZ, TYPE } from '../../services/storage';
import { useNavigate, useNavigation } from 'react-router-dom';

export const ScoreWindow = () => {
  const [score, setScore] = useState<number>(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const data: QUIZ = JSON.parse(get(TYPE.SESSION, KEY.QUIZ) || "{}");
    setScore(data?.score || 0);
    setNumberOfQuestions(data?.numberOfQuestions || 0);
  }, []);

  const onClick = () =>{
    navigate("../list");
  }

  return (
    <div>
      <div>Your score is:</div>
      <p>{score}/{numberOfQuestions}</p>
      <button onClick={onClick}>Ok</button>
    </div>
  );
};
