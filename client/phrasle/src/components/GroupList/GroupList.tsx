import { useEffect, useState } from 'react';
import { Group } from '../../App';
import { getUserId } from '../../services/authentication';
import { addGroup, deleteGroup, getGroupListDetails } from '../../services/group';
import './GroupList.css';

interface GroupElement {
  group: Group;
  size: number;
}

export const GroupList = () => {
  const [groupList, setGroupList] = useState<GroupElement[]>([]);
  const [addActive, setAddActive] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');

  useEffect(() => {
    getGroupListDetails().then((res) => setGroupList(res.data));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewGroupName(e.target.value);
  };

  const addNewGroup = () => {
    if (newGroupName.trim().length === 0) return;
    const group: Group = { id: -1, name: newGroupName, userId: getUserId() || '' };
    addGroup(group).then(() => window.location.reload());
  };

  const deleteGroupById = (grouListIndex: number) => {
    const group: Group = groupList[grouListIndex].group;
    const answer = window.confirm('Are you sure you want to delete group: ' + group.name + '?');
    if (answer)
      deleteGroup(group)
        .then(() => window.location.reload())
        .catch(() => alert("Couldn't delete this group."));
  };

  return (
    <div className='groupList_container'>
      <p className='groupList_title'>Groups:</p>
      <div className='groupList_tableHeaders'>
        <p>Name</p>
        <p>Size</p>
      </div>
      <ul className='groupList_list'>
        {groupList.map((e, index) => (
          <ol key={index}>
            <div className='groupElement_text'>
              <p>{e.group.name}</p>
              <p>{e.size}</p>
            </div>
            <button onClick={() => deleteGroupById(index)}>Delete</button>
          </ol>
        ))}
        <ol className={`${!addActive ? 'groupElement_hidden' : ''}`}>
          <div className='groupElement_text'>
            <p>
              <input
                disabled={Boolean(!addActive)}
                type='text'
                placeholder='Name...'
                onChange={handleInputChange}
                value={newGroupName}
              />
            </p>
            <p>0</p>
          </div>
          <button
            className='groupElement_saveButton'
            onClick={addNewGroup}>
            Save
          </button>
        </ol>
        <div className='groupList_addNewGroup center'>
          {addActive ? (
            <button
              id='groupList_cancelButton'
              onClick={() => setAddActive(false)}>
              Cancel
            </button>
          ) : (
            <button onClick={() => setAddActive(true)}>+</button>
          )}
        </div>
      </ul>
    </div>
  );
};
