import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../../App';
import { getGroupList } from '../../../services/group';
import { getAmountOfPhrasesByGroup } from '../../../services/phrase';
import { KEY, QUIZ, save, TYPE } from '../../../services/storage';
import { GroupListDropdown } from '../../List/GroupListDropdown/GroupListDropdown';
import './QuizSettings.css';

import yellowStar from '../../../assets/image/yellow_star.png';
import transparentStar from '../../../assets/image/star.png';
import halfStar from '../../../assets/image/half_star.png';

const RADIO_OPTIONS = ['unstarred', 'all', 'starred'];

export const QuizSettings = () => {
  const [maxAmount, setMaxAmount] = useState<number>(1);
  const [count, setCount] = useState<number>(1);

  const [groupList, setGroupList] = useState<Group[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<number>(-1);
  const [starred, setStarred] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getGroupList().then((res) => {
      setGroupList(res.data);
      if (currentGroupId === -1) setCurrentGroupId(res.data[0].id);

      getAmountOfPhrasesByGroup(
        starred,
        currentGroupId === -1 ? res.data[0].id : currentGroupId
      ).then((r) => {
        setMaxAmount(Math.max(r.data - 3, 0));
      });
    });
    return () => {};
  }, [starred, currentGroupId]);

  const increaseCount = () => setCount((prev) => Math.min(prev + 1, maxAmount));

  const decreaseCount = () => setCount((prev) => Math.max(prev - 1, 1));

  const onInputChange = (event: any) => setCount(event.target.value);

  const reloadMaxQuestionCount = (strd: boolean | null, gid: number) =>
    getAmountOfPhrasesByGroup(strd, gid).then((r) => {
      setMaxAmount(Math.max(r.data - 3, 0));
      setCount(Math.max(r.data - 3, 0));
    });

  const onStart = () => {
    const result: QUIZ = { numberOfQuestions: count, groupId: currentGroupId, starred };
    save(TYPE.SESSION, KEY.QUIZ, JSON.stringify(result));
    navigate('../play/quiz/game');
  };

  const validateInputChange = () => {
    if (count < 1) setCount(0);
    if (count > maxAmount) setCount(maxAmount);
    if (maxAmount === 0) setCount(0);
  };

  const onGroupChange = (gid: number) => {
    setCurrentGroupId(gid);
    reloadMaxQuestionCount(starred, gid);
  };

  /**
   * Updates the starred filter based on the selected option index.
   * Resets the phrase index to the beginning.
   * @param optionIndex Index of the selected filter option.
   */
  const updateStarredFilter = (optionIndex: number) => {
    const s = optionIndex === 0 ? false : optionIndex === 2 ? true : null;
    setStarred(s);
    reloadMaxQuestionCount(s, currentGroupId);
  };

  /**
   * Handles changes to the starred filter radio buttons.
   * @param e Event triggered by the radio button change.
   */
  const handleStarFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionIndex = RADIO_OPTIONS.indexOf(e.target.id);
    if (optionIndex !== -1) updateStarredFilter(optionIndex);
  };

  return (
    <div
      style={{ width: '100vw', height: '95vh', display: 'flex' }}
      className='center'>
      <div className='container center'>
        <p>Quiz Settings</p>
        <form className='starOptions'>
          {RADIO_OPTIONS.map((option, index) => (
            <label key={option}>
              <input
                type='radio'
                name='starred'
                id={option}
                checked={
                  (index === 0 && starred === false) ||
                  (index === 1 && starred === null) ||
                  (index === 2 && starred === true)
                }
                onChange={handleStarFilterChange}
              />
              <img
                src={index === 0 ? transparentStar : index === 1 ? halfStar : yellowStar}
                alt={option}
              />
            </label>
          ))}
        </form>
        <div className='groupDropdown'>
          <label>Group:</label>
          <div>
            <GroupListDropdown
              currentGroupId={currentGroupId}
              groupList={groupList}
              onChange={onGroupChange}
            />
          </div>
        </div>
        <div className='questionAmount'>
          <label>How many questions?</label>
          <div>
            <button
              disabled={count <= 1}
              onClick={decreaseCount}>
              -
            </button>
            <input
              type='number'
              value={maxAmount <= 0 ? 0 : count}
              onChange={onInputChange}
              onBlur={() => validateInputChange()}
            />
            <button
              onClick={increaseCount}
              disabled={count >= maxAmount}>
              +
            </button>
          </div>
        </div>
        <button
          disabled={maxAmount <= 0}
          className='startButton'
          onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
};
