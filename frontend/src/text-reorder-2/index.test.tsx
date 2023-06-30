import { screen } from '@testing-library/react';
import Router from 'react-router';

import { renderWithinProviders } from '../../tests/utils';
import { useTrainingsStore } from '../store';
import { TextReorder2 } from '.';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('TextReorder', () => {
  it('should retrieve the text reorder from the store', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    renderWithinProviders(<TextReorder2 />, {
      useTrainingsStore: useTrainingsStore,
    });
    expect(screen.getByText('toto')).toBeInTheDocument();
  });
});

it('should go back to home if id is not matching a text reorder from store', async () => {
  renderWithinProviders(<TextReorder2 />, {
    useTrainingsStore: () => ({
      useCurrentTextReorder: () => undefined,
      textReorders: [],
      setTextReorders: () => {},
    }),
  });

  expect(screen.queryByTestId('home')).not.toBeInTheDocument();
});
