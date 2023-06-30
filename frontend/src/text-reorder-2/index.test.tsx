import { screen } from '@testing-library/react';
import Router from 'react-router';

import { renderWithinProviders } from '../../tests/utils';
import { createUseStore, useTrainingsStore } from '../store';
import { TextReorder2 } from '.';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('TextReorder', () => {
  it('should retrieve the text reorder from the store', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    renderWithinProviders(<TextReorder2 />, {
      useStore: createUseStore({
        textReorders: [
          {
            id: 1,
            orderedSentences: ['a', 'b'],
            randomizedSentences: ['a', 'b'],
            title: 'Title',
          },
        ],
      }),
    });
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});

it('should go back to home if id is not matching a text reorder from store', async () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: '2' });
  renderWithinProviders(<TextReorder2 />, {
    useStore: createUseStore({
      textReorders: [
        {
          id: 1,
          orderedSentences: ['a', 'b'],
          randomizedSentences: ['a', 'b'],
          title: 'Title',
        },
      ],
    }),
  });
  expect(screen.queryByText('Title')).not.toBeInTheDocument();
});
