import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import Card, { CardActions, CardContent } from '../../components/atoms/Card';
import Title from '../../components/atoms/Title';
import Result from '../../components/molecules/Result';
import TransactionForm from '../../components/organisms/TransactionForm';
import useTransactions from './useTransactions';

interface Props {}

const Transactions: React.FC<Props> = ({}) => {
  const { form, createTransaction, loading, goBack, result } = useTransactions();

  return (
    <Card>
      <CardContent>
        <Title>{!result ? 'Create Transaction' : 'Successful Transaction'}</Title>
        <Routes>
          <Route
            path="/"
            element={
              <TransactionForm
                date={form.date}
                amount={form.amount}
                currency={form.currency}
                clientId={form.clientId}
                setDate={form.setDate}
                setAmount={form.setAmount}
                setCurrency={form.setCurrency}
                setClientId={form.setClientId}
                dateError={form.dateError}
                amountError={form.amountError}
              />
            }
          />
          <Route path="/success" element={<>{!result ? <Navigate to="/" /> : <Result result={result} />}</>} />
        </Routes>
      </CardContent>
      <CardActions>
        <Button onClick={!result ? createTransaction : goBack} loading={loading}>
          {!result ? 'Send' : 'Back'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Transactions;
