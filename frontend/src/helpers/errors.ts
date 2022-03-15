export const isError = (e: unknown): e is Error => e instanceof Error && 'message' in e;

const knownErrors = new Map([
  ['invalid-date-format', 'You have entered invalid date format'],
  ['date-in-the-future', 'You have entered date in the future'],
  ['invalid-amount-format', 'You have entered invalid amount format'],
]);

export const getErrorText = (errorMessage: string) => {
  const text = knownErrors.get(errorMessage);
  if (!text) return 'Unknown error';
  return text;
};
