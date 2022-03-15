import clsx from 'clsx';
import React from 'react';
import './style.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input: React.FC<Props> = ({ error, helperText, ...props }) => {
  return (
    <div className="input">
      <input {...props} className={clsx('input__input', error && 'input__input--error')} />
      {helperText && (
        <div className={clsx('input__helper-text', error && 'input__helper-text--error')}>{helperText}</div>
      )}
    </div>
  );
};

export default Input;
