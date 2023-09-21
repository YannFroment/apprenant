import { act, renderHook } from '@testing-library/react';

import { Trainings } from '../domain/Trainings';
import { useTrainingsStore } from '.';

describe('useTrainingsStore', () => {
  describe('setTrainings', () => {
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

    it('should update wordRecognitions', () => {
      const { result } = renderHook(useTrainingsStore);
      const wordRecognitions = [
        {
          id: 1,
          title: 'title',
          words: [],
        },
      ];
      const trainings: Trainings = {
        textReorders: [],
        wordRecognitions,
      };

      act(() => result.current.setTrainings(trainings));

      expect(result.current.wordRecognitions).toEqual(wordRecognitions);
    });
  });

  describe('getTextReorderById', () => {
    it('should return the text reorder training matching a given id', () => {
      const textReorder = {
        id: 1,
        title: 'title',
        orderedSentences: ['a', 'b'],
        randomizedSentences: ['b', 'a'],
      };
      const { result } = renderHook(useTrainingsStore, {
        initialProps: {
          textReorders: [textReorder],
        },
      });

      expect(result.current.getTextReorderById(1)).toEqual(textReorder);
    });
  });
});
