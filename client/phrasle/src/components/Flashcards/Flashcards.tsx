import React, { useCallback, useEffect, useState } from 'react';
import { Group, Phrase } from '../../App';
import { getListOfPhrases, getShuffledListOfPhrases } from '../../services/phrase';
import { getGroupList } from '../../services/group';
import { Box } from '../PhraseBox/Box';
import { GroupListDropdown } from '../List/GroupListDropdown/GroupListDropdown';
import './Flashcards.css';

import yellowStar from '../../assets/image/yellow_star.png';
import transparentStar from '../../assets/image/star.png';
import halfStar from '../../assets/image/half_star.png';
import shuffleIcon from '../../assets/image/shuffle.png';

const RADIO_OPTIONS = ['unstarred', 'all', 'starred'];

/**
 * Flashcards Component
 * This component renders a flashcard application with functionality to filter, shuffle,
 * and navigate through a list of phrases. Users can select groups, apply starred filters,
 * and toggle between phrase value and definition.
 */
export const Flashcards = () => {
  // State for the list of phrases to display
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  // State for the current index of the displayed phrase
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for the starred filter: true (starred), false (unstarred), null (all)
  const [starred, setStarred] = useState<boolean | null>(null);

  // State to determine if the list should be shuffled
  const [shuffle, setShuffle] = useState(false);

  // List of available groups and the current group selection
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState(-1);

  // State to toggle between showing the value or definition of a phrase
  const [showValue, setShowValue] = useState(true);

  /**
   * Fetches the phrases based on the current starred filter, group, and shuffle state.
   * @param groupId Optional group ID to fetch phrases for.
   */
  const fetchPhrases = useCallback(
    (groupId?: number) => {
      const fetchFn = shuffle ? getShuffledListOfPhrases : getListOfPhrases;
      fetchFn(starred, groupId || currentGroupId)
        .then((res) => setPhrases(res.data))
        .catch(console.error);
    },
    [starred, currentGroupId, shuffle]
  );

  /**
   * Fetches the list of groups and initializes the selected group.
   * Automatically fetches the phrases for the initial group.
   */
  useEffect(() => {
    getGroupList()
      .then((res) => {
        const groups = res.data;
        setGroupList(groups);
        const initialGroupId = currentGroupId === -1 ? groups[0]?.id : currentGroupId;
        setCurrentGroupId(initialGroupId);
        fetchPhrases(initialGroupId);
      })
      .catch(console.error);
  }, [fetchPhrases, currentGroupId]);

  /**
   * Updates the starred filter based on the selected option index.
   * Resets the phrase index to the beginning.
   * @param optionIndex Index of the selected filter option.
   */
  const updateStarredFilter = (optionIndex: number) => {
    setCurrentIndex(0);
    setStarred(optionIndex === 0 ? false : optionIndex === 2 ? true : null);
  };

  /**
   * Handles changes to the starred filter radio buttons.
   * @param e Event triggered by the radio button change.
   */
  const handleStarFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionIndex = RADIO_OPTIONS.indexOf(e.target.id);
    if (optionIndex !== -1) updateStarredFilter(optionIndex);
  };

  /**
   * Handles navigation between phrases (next or previous).
   * @param direction 'next' for forward navigation, 'prev' for backward navigation.
   */
  const handleNavigation = (direction: 'next' | 'prev') => {
    setCurrentIndex((prevIndex) =>
      direction === 'next'
        ? Math.min(prevIndex + 1, phrases.length - 1)
        : Math.max(prevIndex - 1, 0)
    );
  };

  /**
   * Toggles the shuffle state and resets the current index.
   */
  const handleShuffleSwitch = () => {
    setShuffle((prev) => !prev);
    setCurrentIndex(0);
  };

  return (
    <div
      id='flashCardContainer'
      className='center'>
      {/* Options Panel */}
      <div className='options center'>
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

        <label className='shuffle_button'>
          <input
            type='checkbox'
            checked={shuffle}
            onChange={handleShuffleSwitch}
          />
          <img
            src={shuffleIcon}
            alt='shuffle'
          />
        </label>
      </div>

      {/* Flashcard Display */}
      <div className='flashCard center'>
        <div className='group_dropdown_container'>
          <GroupListDropdown
            groupList={groupList}
            currentGroupId={currentGroupId}
            onChange={(gid) => {
              setCurrentGroupId(gid);
              fetchPhrases(gid);
            }}
          />
        </div>

        <div className={`boxContainer ${showValue ? '_value' : '_definition'}`}>
          <Box
            value={phrases[currentIndex]?.value}
            definition={phrases[currentIndex]?.definition}
            onClick={setShowValue}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='buttons center'>
        <button
          disabled={currentIndex === 0}
          onClick={() => handleNavigation('prev')}>
          {'<'}
        </button>

        <p className='counterInfo'>
          {phrases.length ? currentIndex + 1 : 0}/{phrases.length}
        </p>

        <button
          disabled={currentIndex === phrases.length - 1}
          onClick={() => handleNavigation('next')}>
          {'>'}
        </button>
      </div>
    </div>
  );
};
