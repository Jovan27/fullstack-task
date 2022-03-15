import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DATE_FORMAT } from '../../constants';
import { isError, getErrorText } from '../../helpers/errors';
import { isAmountValid, isDateFormatValid, isDateInTheFuture } from '../../helpers/validators';
import { RootState } from '../../store';
import { clearError, clearResult, setError, setResult } from '../../store/app';

export default () => {
  const [date, setDate] = useState(format(new Date(), DATE_FORMAT));
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(false);
  const { date: dateError, amount: amountError } = useSelector((state: RootState) => state.app.errors);
  const result = useSelector((state: RootState) => state.app.result);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const invalidDateFormat = !isDateFormatValid(date);
    const dateInTheFuture = isDateInTheFuture(date);
    if (!invalidDateFormat && !dateInTheFuture && !dateError) return;
    else if (invalidDateFormat) dispatch(setError({ kind: 'date', message: 'invalid-date-format' }));
    else if (dateInTheFuture) dispatch(setError({ kind: 'date', message: 'date-in-the-future' }));
    else dispatch(clearError({ kind: 'date' }));
  }, [date]);

  useEffect(() => {
    const invalidAmount = !isAmountValid(amount);
    if (!invalidAmount && !amountError) return;
    else if (invalidAmount) dispatch(setError({ kind: 'amount', message: 'invalid-amount-format' }));
    else dispatch(clearError({ kind: 'amount' }));
  }, [amount]);

  const createTransaction = async () => {
    if (dateError || amountError) return;
    setLoading(true);
    try {
      const { data } = await axios.post<{ amount: string; currency: string }>('http://localhost:3001/transactions', {
        date,
        amount: amount.split(',').join(''),
        currency,
        client_id: Number(clientId),
      });
      dispatch(setResult(data));
      navigate('/success');
    } catch (e) {
      if (isError(e)) alert(getErrorText(e.message));
      alert('Unknown error');
    }
    setLoading(false);
  };

  const goBack = () => {
    dispatch(clearResult());
    navigate('/');
  };

  return {
    createTransaction,
    loading,
    goBack,
    result,
    form: {
      date,
      amount,
      currency,
      clientId,
      setDate,
      setAmount,
      setCurrency,
      setClientId,
      dateError,
      amountError,
    },
  };
};
