import { addDays, isMatch, startOfDay } from 'date-fns';
import { DATE_FORMAT } from '../constants';

export const isDateInTheFuture = (date: string) => new Date(date) >= startOfDay(addDays(new Date(), 1));

export const isDateFormatValid = (date: string) => isMatch(date, DATE_FORMAT);

export const isAmountValid = (amount: string) => /^([\d,]{0,18})(\.{1}\d*)?$/.test(amount);
