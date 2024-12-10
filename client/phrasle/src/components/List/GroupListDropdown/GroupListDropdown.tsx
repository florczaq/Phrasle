import { useEffect, useState } from 'react';
import './GroupListDropdown.css';
import { Group } from '../../../App';

interface GroupListDropdownInt {
  groupList: Group[];
  currentGroupId: number;
  onChange: (group_id: number) => void;
}

export const GroupListDropdown = ({ groupList, currentGroupId,onChange }: GroupListDropdownInt) => {
  const [options, setOptions] = useState<Group[]>([]);

  const handleOption = (e: any) => onChange(e.target.value);

  useEffect(() => setOptions(groupList), [groupList]);

  return (
    <div className='group_list_dropdown_container center'>
      <select
        value={currentGroupId}
        className='group_select'
        onChange={(e) => handleOption(e)}>
        {options.map((e, i) => (
          <option
            key={i}
            value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
    </div>
  );
};
