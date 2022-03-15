import React from 'react';
import SuccessIcon from '../../atoms/Icon/SuccessIcon';
import './style.scss';

interface Props {
  result: {
    amount: string;
    currency: string;
  };
}

const Result: React.FC<Props> = ({ result }) => (
  <div className="result">
    <SuccessIcon />
    <p>
      <strong>Commission: {result.amount}</strong>
    </p>
    <p>
      <strong>Currency: {result.currency}</strong>
    </p>
  </div>
);

export default Result;
