import { useState } from 'react';
import './SlideMenu.css';

interface SlideMenuInt {
  options: Array<{ href: string; label: string }>;
}
export const SlideMenu = ({ options }: SlideMenuInt) => {
  const [active, setActive] = useState<boolean>(false);

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
          {options.map((element, i) => {
            return (
              <ol>
                <a href={element.href}>{element.label}</a>
              </ol>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
