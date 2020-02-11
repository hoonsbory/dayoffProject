import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom';

// test('renders learn react link', () => {
//   const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
//     //const linkElement = getByText(/learn react/i);
//   expect(getByText).toBeInTheDocument();
// });
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});