import clsx from 'clsx';
import React from 'react';
import PartialCircle from '../Icon/PartialCircleIcon';
import './style.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<Props> = ({ children, loading, ...props }) => {
  return (
    <button className={clsx('button', loading && 'button--loading')} disabled={loading || props.disabled} {...props}>
      {loading ? <PartialCircle /> : children}
    </button>
  );
};

export default Button;
