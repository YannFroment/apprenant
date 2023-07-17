import { screen } from '@testing-library/react';
import Router from 'react-router';

import { renderWithinProviders } from '../../tests/utils';
import { createUseStore } from '../store';
import { TextReorderContainer } from './TextReorderContainer';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('TextReorderContainer', () => {
  it('should retrieve the text reorder from the store', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    renderWithinProviders(<TextReorderContainer />, {
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
    expect(screen.queryByTestId('text-reorder-training')).toBeInTheDocument();
  });
});

it('should go back to home if id is not matching a text reorder from store', async () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: '2' });
  renderWithinProviders(<TextReorderContainer />, {
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
  expect(screen.queryByTestId('text-reorder-training')).not.toBeInTheDocument();
});

it('should display title', async () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
  renderWithinProviders(<TextReorderContainer />, {
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
