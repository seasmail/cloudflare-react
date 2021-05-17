import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders recent transaction', () => {
  render(<App />);
  const linkElement = screen.getByText('Recent Transactions');
  expect(linkElement).toBeInTheDocument();
});

test('renders number', () => {
  render(<App />);
  const linkElement = screen.getByText('Number');
  expect(linkElement).toBeInTheDocument();
});
