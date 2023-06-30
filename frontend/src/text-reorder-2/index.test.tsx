import { screen } from '@testing-library/react';

import { renderWithinRoutes } from '../../tests/utils';
import { createUseStore } from '../store';
import { TextReorder2 } from '.';

describe('TextReorder', () => {
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

    renderWithinRoutes({
      routes: [{ path: '/text-reorder/:id', element: <TextReorder2 /> }],
      initialEntries: [`/text-reorder/${id}`],
      overrideServices: { useStore: customStore },
    });

    expect(screen.getByText('toto')).toBeInTheDocument();
  });

  it('should go back to home if id is not matching a text reorder from store', async () => {
    const id = 1;

    const customStore = createUseStore({
      textReorders: [
        {
          id: 12,
          orderedSentences: ['a', 'b'],
          randomizedSentences: ['a', 'b'],
          title: 'toto',
        },
      ],
    });

    renderWithinRoutes({
      routes: [
        { path: '/', element: <div data-testid="home" /> },
        { path: '/text-reorder/:id', element: <TextReorder2 /> },
      ],
      initialEntries: [`/text-reorder/${id}`],
      overrideServices: { useStore: customStore },
    });

    expect(screen.queryByTestId('home')).toBeInTheDocument();
  });
});
