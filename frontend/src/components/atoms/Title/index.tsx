import React from 'react';
import './style.scss';

interface Props {}

const Title: React.FC<Props> = ({ children }) => {
  return <h4 className="title">{children}</h4>;
};

export default Title;
