import React from 'react';
import './style.scss';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<Props> = (props) => {
  return <label {...props} className="label" />;
};

export default Label;
