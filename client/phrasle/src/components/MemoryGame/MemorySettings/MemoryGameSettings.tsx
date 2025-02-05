import { useEffect, useState } from 'react';
import './MemoryGameSettings.css';
import { Group, Phrase } from '../../../App';
import { getNewMemoryGame } from '../../../services/memoryGame';
import { GroupListDropdown } from '../../List/GroupListDropdown/GroupListDropdown';
import { getGroupList } from '../../../services/group';
import { getAmountOfPhrases, getAmountOfPhrasesByGroup } from '../../../services/phrase';

import yellowStar from '../../../assets/image/yellow_star.png';
import transparentStar from '../../../assets/image/star.png';
import halfStar from '../../../assets/image/half_star.png';

export const MemoryGameSettings = () => {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<number>(-1);
  const [groupSize, setGroupSize] = useState<number>(-1);
  const [starred, setStarred] = useState<boolean | null>(null);
  const [phraseAmount, setPhraseAmount] = useState<number>(0);

  const RADIO_OPTIONS = ['unstarred', 'all', 'starred'];

  const sizeList = [
    { value: 0, label: '0x0' },
    { value: 9, label: '3x3' },
    { value: 16, label: '4x4' },
    { value: 25, label: '5x5' },
    { value: 36, label: '6x6' },
    { value: 49, label: '7x7' },
    { value: 64, label: '8x8' },
    { value: 81, label: '9x9' },
  ];

  useEffect(() => {
    getGroupList()
      .then((res) => {
        setGroupList(res.data);
        getAmountOfPhrasesByGroup(
          starred,
          currentGroupId === -1 ? Number(res.data[0].id) : currentGroupId
        ).then((r) => {
          setGroupSize(r.data);
          });
        if (currentGroupId === -1) setCurrentGroupId(res.data[0].id);
      })
      .catch((err) => {});
  }, [currentGroupId, starred]);

  const handleGroupChange = (gid: number) => {
    setCurrentGroupId(gid);
    setPhraseAmount(0);
  };

  const handleSizeChange = (e: any) => setPhraseAmount(e.target.value);

  const updateStarredFilter = (optionIndex: number) => {
    const s = optionIndex === 0 ? false : optionIndex === 2 ? true : null;
    setStarred(s);
  };

  const handleStarFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionIndex = RADIO_OPTIONS.indexOf(e.target.id);
    if (optionIndex !== -1) updateStarredFilter(optionIndex);
    setPhraseAmount(0);
  };

  return (
    <div className='memoryGameSettings_container center'>
      <div className='memoryGameSettings'>
        <h2>Game Settings</h2>

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

        <div className='memoryGameSettings_groupPicker'>
          <label>Group:</label>
          <GroupListDropdown
            groupList={groupList}
            onChange={handleGroupChange}
            currentGroupId={currentGroupId}
          />
        </div>

        <div className='memoryGameSettings_selectContainer'>
          <label>Size:</label>
          <select
            className='memoryGameSettings_select'
            value={phraseAmount}
            onChange={handleSizeChange}>
            {sizeList
              .filter((e) => e.value <= groupSize)
              .map((element, index) => {
                return (
                  <option
                    key={index}
                    value={element.value}>
                    {element.label}
                  </option>
                );
              })}
          </select>
        </div>

        <button
          className='memoryGameSettings_startButton'
          disabled={phraseAmount === 0}>
          Start
        </button>
      </div>
    </div>
  );
};
