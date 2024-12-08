import { useEffect, useState } from 'react';
import { Group, Phrase } from '../../App';
import { getToken } from '../../services/authentication';
import { getListOfPhrases } from '../../services/phrase';
import './List.css';
import { PhraseList } from './PhraseList/PhraseList';
import { GroupListDropdown } from './GroupListDropdown/GroupListDropdown';
import { getGroupList } from '../../services/group';

export const List = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<number>(2);

  useEffect(() => {
    if (!getToken()) return;
    getListOfPhrases(null, currentGroupId).then((res) => setPhrases(res.data));
    getGroupList().then((res) => setGroupList(res.data));
  }, [currentGroupId]);

  return (
    <div
      id='listOfWordsContainer'
      className='center'>
      <div className='groupNameContainer'>
        <GroupListDropdown
          groupList={groupList}
          currentGroupId={currentGroupId}
          onChange={(gid) => {
            setCurrentGroupId(gid);
            console.log(gid);
          }}
        />
      </div>
      <div className='list'>
        <PhraseList
          listTitle='Starred'
          phrases={phrases.filter((phrase) => phrase.starred)}
        />

        <PhraseList
          listTitle='Phrases'
          phrases={phrases.filter((phrase) => !phrase.starred)}
        />
      </div>
    </div>
  );
};
