import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import star from '../../assets/image/star.png';
import yellowStar from '../../assets/image/yellow_star.png';
import { addPhrase, editPhrase } from '../../services/phrase';
import './PhraseForm.css';
import { GroupListDropdown } from '../List/GroupListDropdown/GroupListDropdown';
import { Group } from '../../App';
import { getGroupList } from '../../services/group';

export const AddPhrasePage = () => {
  const [phraseId, setPhraseId] = useState<number>(-1);
  const [starred, setStarred] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [definition, setDefiniton] = useState<string>('');
  const [groupId, setGroupId] = useState<number>(-1);
  const [edit, setEdit] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<Group[]>([]);

  const navigate = useNavigate();
  const state = useLocation();

  useEffect(() => {
    const phrase = state?.state?.phrase || undefined;

    getGroupList()
      .then((res) => {
        setGroupList(res.data);
        setGroupId(res.data[0].id);
      })
      .then(() => {
        if (phrase) {
          setPhraseId(phrase.id || -1);
          setStarred(phrase.starred || false);
          setValue(phrase.value);
          setDefiniton(phrase.definition);
          setEdit(true);
          setGroupId(phrase.groupId);
        }
      });

    return () => {};
  }, [state?.state?.phrase]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    switch (e.target.id.toString()) {
      case 'phrase':
        setValue(e.target.value);
        break;
      case 'definition':
        setDefiniton(e.target.value);
        break;
    }
  };

  const handleGroupChange = (gid: number) => setGroupId(gid);

  const onSumbit = () => {
    const query = edit ? editPhrase : addPhrase;
    //TODO delete
    console.log({ id: phraseId, value: value, definition, starred, groupId });
    //TODO
    query({ id: phraseId, value: value, definition, starred, groupId })
      .then(() => navigate('/list'))
      .catch((error) => console.log(error.response.status));
  };

  return (
    <div
      id='addPhrasePageContainer'
      className='center'>
      <div className='fields center'>
        <label>Phrase:</label>
        <input
          type='text'
          className='phrase'
          value={value}
          id='phrase'
          onChange={handleInput}
          placeholder='Phrase...'
        />
        <div className='groupInput'>
          <label>Group:</label>
          <div className='groupForm'>
            <GroupListDropdown
              groupList={groupList}
              currentGroupId={groupId}
              onChange={handleGroupChange}
            />
          </div>
        </div>
        <label>Definition:</label>
        <textarea
          className='definition'
          id='definition'
          value={definition}
          onChange={handleInput}
          placeholder='Definition...'
        />
        <button onClick={() => onSumbit()}>{edit ? 'Save' : 'Add'}</button>
      </div>
      <div className='star'>
        <img
          onClick={() => setStarred((prev) => !prev)}
          src={starred ? yellowStar : star}
          alt='star'
        />
      </div>
    </div>
  );
};
