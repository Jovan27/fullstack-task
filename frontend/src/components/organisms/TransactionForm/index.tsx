import React from 'react';
import Input from '../../atoms/Input/Input';
import Label from '../../atoms/Label';
import NumberFormat from 'react-number-format';
import Dropdown from '../../atoms/Dropdown';
import { Currency } from '@fullstack-task/shared';
import { getErrorText } from '../../../helpers/errors';

interface Props {
  date: string;
  dateError: string | null;
  setDate(date: string): void;
  amount: string;
  amountError: string | null;
  setAmount(date: string): void;
  currency: string;
  setCurrency(date: string): void;
  clientId: string;
  setClientId(date: string): void;
}

const TransactionForm: React.FC<Props> = ({
  date,
  dateError,
  setDate,
  amount,
  amountError,
  setAmount,
  currency,
  setCurrency,
  clientId,
  setClientId,
}) => {
  return (
    <div className="transaction-form">
      <Label htmlFor="date">Date</Label>
      <Input
        id="date"
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        error={!!dateError}
        helperText={dateError ? getErrorText(dateError) : undefined}
      />

      <Label htmlFor="amount">Amount</Label>
      <NumberFormat
        thousandSeparator=","
        decimalScale={2}
        fixedDecimalScale
        value={amount}
        onValueChange={({ formattedValue }) => setAmount(formattedValue)}
        customInput={Input}
        error={!!amountError}
        helperText={amountError ? getErrorText(amountError) : undefined}
      />

      <Label htmlFor="currency">Currency</Label>
      <Dropdown
        value={currency}
        options={Object.keys(Currency).map((currency) => ({ key: currency, value: currency }))}
        onChange={setCurrency}
      />

      <Label htmlFor="clientId">Client ID</Label>
      <Input id="clientId" type="text" onChange={(e) => setClientId(e.target.value)} value={clientId} />
    </div>
  );
};

export default TransactionForm;
