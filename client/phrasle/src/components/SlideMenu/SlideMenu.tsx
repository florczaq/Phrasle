import { useState } from 'react';
import './SlideMenu.css';
import { MenuOption } from '../TopBar/TopBar';

interface SlideMenuInt {
  options: MenuOption[][];
}
export const SlideMenu = ({ options }: SlideMenuInt) => {
  const [active, setActive] = useState<boolean>(false);

  console.log(options);

  return (
    <div>
      <button
        className='activeToggle center'
        onClick={() => setActive((prev) => !prev)}>
        <div className='hamburgerIcon_container'>
          <div className={`hamurgerIcon${active ? '_active' : ''}`}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </button>
      <div className={`slideOptionListContainer ${active ? '_visible' : '_hidden'}`}>
        <ul className={`slideOptionList`}>
          {options.map((menuGroup, index) => (
            <ol key={index}>
              {menuGroup.map((option, i) => (
                <div key={i}>
                  {'name' in option ? (
                    <div className='nestedMenu'>
                      <label>{option.name}</label>
                      <ul>
                        {option.data.map((item, idx) => (
                          <ol key={idx}>
                            <a href={item.href}>{item.label}</a>
                          </ol>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <a href={option.href}>{option.label}</a>
                  )}
                </div>
              ))}
            </ol>
          ))}
        </ul>
      </div>
    </div>
  );
};
