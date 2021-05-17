// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { render, screen } from '@testing-library/react';

import { TransactionTable } from '../TransactionTable';
import { MOCK_TRANSACTIONS } from './mocks';

test('no table if no transactions', () => {
  const { container } = render(<TransactionTable  transactions={[]}/>);
  expect(container.firstChild).not.toHaveClass('table');

  const linkElement = screen.getByText('No transactions found');
  expect(linkElement).toBeInTheDocument();
});

test('renders table if transactions exist', () => {
  const { container } = render(<TransactionTable  transactions={MOCK_TRANSACTIONS}/>);
  expect(container.querySelector('.table')).toBeTruthy();
  expect(container.querySelectorAll('tbody > tr').length).toEqual(MOCK_TRANSACTIONS.length);
});
