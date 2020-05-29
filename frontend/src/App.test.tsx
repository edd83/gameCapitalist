import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders cash text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Cash/i);
  expect(linkElement).toBeInTheDocument();
});
