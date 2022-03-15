import React from 'react';
import './style.scss';

export const CardContent: React.FC = ({ children }) => <div className="card__content">{children}</div>;
export const CardActions: React.FC = ({ children }) => <div className="card__actions">{children}</div>;

const Card: React.FC = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
