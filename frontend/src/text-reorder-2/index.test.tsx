import { screen } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { TextReorder2 } from '.';

describe('TextReorder', () => {
  it('should retrieve the text reorder from the store', async () => {
    renderWithinProviders(<TextReorder2 />, {
      useTrainingStore: () => ({
        useCurrentTextReorder: () => ({
          id: 1,
          orderedSentences: ['a', 'b'],
          randomizedSentences: ['a', 'b'],
          title: 'toto',
        }),
        textReorders: [],
        setTextReorders: () => {},
      }),
    });
    expect(screen.getByText('toto')).toBeInTheDocument();
  });
});

it('should go back to home if id is not matching a text reorder from store', async () => {
  renderWithinProviders(<TextReorder2 />, {
    useTrainingStore: () => ({
      useCurrentTextReorder: () => undefined,
      textReorders: [],
      setTextReorders: () => {},
    }),
  });

  expect(screen.queryByTestId('home')).not.toBeInTheDocument();
});
