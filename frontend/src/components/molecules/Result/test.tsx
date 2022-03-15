import { render, screen } from '@testing-library/react';
import Result from './';

test('renders result properly', () => {
  render(<Result result={{ amount: '0.10', currency: 'EUR' }} />);
  const p1 = screen.getByText(/Commission: 0.10/i);
  const p2 = screen.getByText(/Currency: EUR/i);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
});
