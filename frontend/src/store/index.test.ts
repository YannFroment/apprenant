import { act, renderHook } from '@testing-library/react';

import { Trainings } from '../domain/Trainings';
import { useTrainingsStore } from '.';

describe('useTrainingsStore', () => {
  it('should update textReorders', () => {
    const { result } = renderHook(useTrainingsStore);
    const textReorders = [
      {
        id: 1,
        title: 'title',
        orderedSentences: ['a', 'b'],
        randomizedSentences: ['b', 'a'],
      },
    ];
    const trainings: Trainings = {
      textReorders,
      wordRecognitions: [],
    };

    act(() => result.current.setTrainings(trainings));

    expect(result.current.textReorders).toEqual(textReorders);
  });
});
