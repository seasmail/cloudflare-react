// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { render, screen } from '@testing-library/react';

import { truncate } from '../../utils';

import Block from '../Block';

import { MOCK_BLOCKPROPS } from './mocks';

test('no hash and number for block', () => {
  const { container } = render(<Block  hash={''} number={''}/>);
  expect(container.querySelector('.card-title')).toBeFalsy();

  const linkElement = screen.getByText('No correct info about block');
  expect(linkElement).toBeInTheDocument();
});

test('renders table if transactions exist', () => {
  const { container } = render(<Block  hash={MOCK_BLOCKPROPS.hash} number={MOCK_BLOCKPROPS.number}/>);
  expect(container.querySelector('.card-title')?.textContent).toContain(+MOCK_BLOCKPROPS.number);
  expect(container.querySelector('.info')?.textContent).toContain(truncate(MOCK_BLOCKPROPS.hash));
});
