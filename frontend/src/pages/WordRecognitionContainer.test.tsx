import { screen } from '@testing-library/react';
import Router from 'react-router';

import { renderWithinProviders } from '../../tests/utils';
import { createUseStore } from '../store/useTrainingsStore';
import { WordRecognitionContainer } from './WordRecognitionContainer';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('WordRecognitionContainer', () => {
  it('should retrieve the word recognition from the store', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    renderWithinProviders({
      children: <WordRecognitionContainer />,
      overrideServices: {
        useTrainingsStore: createUseStore({
          wordRecognitions: [
            {
              id: 1,
              words: [],
              title: 'Title',
            },
          ],
        }),
      },
    });
    expect(
      screen.queryByTestId('word-recognition-training'),
    ).toBeInTheDocument();
  });
});

it('should go back to home if id is not matching a word recognition from store', async () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: '2' });
  renderWithinProviders({
    children: <WordRecognitionContainer />,
    overrideServices: {
      useTrainingsStore: createUseStore({
        wordRecognitions: [
          {
            id: 1,
            words: [],
            title: 'Title',
          },
        ],
      }),
    },
  });
  expect(
    screen.queryByTestId('word-recognition-training'),
  ).not.toBeInTheDocument();
});

it('should display title', async () => {
  jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
  renderWithinProviders({
    children: <WordRecognitionContainer />,
    overrideServices: {
      useTrainingsStore: createUseStore({
        wordRecognitions: [
          {
            id: 1,
            words: [],
            title: 'Title',
          },
        ],
      }),
    },
  });
  expect(screen.getByText('Title')).toBeInTheDocument();
});
