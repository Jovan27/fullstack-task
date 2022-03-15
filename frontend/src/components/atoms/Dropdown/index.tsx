import React, { useRef, useState } from 'react';
import { useOnClickAway } from '../../../hooks/useOnClickAway';
import Angle from '../Icon/AngleIcon';
import './style.scss';

interface Option {
  key: string;
  value: string;
}

interface Props {
  value: string;
  options: Option[];
  onChange(value: string): void;
}

const Dropdown: React.FC<Props> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickAway(ref, () => setOpen(false));
  const handleClick = (option: Option) => {
    onChange(option.value);
    setOpen(false);
  };
  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{value}</span>
        <Angle className="dropdown__toggle__icon" />
      </button>
      <ul className="dropdown__menu" role="listbox">
        {options.map((option) => (
          <li
            className="dropdown__menu__option"
            role="option"
            aria-selected={false}
            key={option.key}
            onClick={() => handleClick(option)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
