import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';

import { renderWithinProviders, renderWithinRoutes } from '../../tests/utils';
import { createUseStore } from '../store';
import { TextReorder2 } from '.';

describe('', () => {
  it('should render with correct params', () => {
    const id = '12';
    renderWithinRoutes(
      <Route path="/text-reorder/:id" element={<TextReorder2 />} />,
      {},
      [`/text-reorder/${id}`],
    );

    expect(screen.getByText('12')).toBeInTheDocument();
  });
  it('should retrieve the text reorder from the store', async () => {
    const id = 12;

    const customStore = createUseStore({
      textReorders: [
        {
          id,
          orderedSentences: ['a', 'b'],
          randomizedSentences: ['a', 'b'],
          title: 'toto',
        },
      ],
    });
    renderWithinRoutes(
      <Route path="/text-reorder/:id" element={<TextReorder2 />} />,
      { useStore: customStore },
      [`/text-reorder/${id}`],
    );

    expect(screen.getByText('toto')).toBeInTheDocument();
  });
});
