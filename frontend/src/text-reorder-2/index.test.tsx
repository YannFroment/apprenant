import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';

import { renderWithinRoutes } from '../../tests/utils';
import { TextReorder2 } from '.';

test('renders with correct params', () => {
  const id = '12';
  renderWithinRoutes(
    <Route path="/text-reorder/:id" element={<TextReorder2 />} />,
    {},
    [`/text-reorder/${id}`],
  );

  expect(screen.getByText('12')).toBeInTheDocument();
});
