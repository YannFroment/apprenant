import { act, renderHook, waitFor } from '@testing-library/react';
import { useDragSentences } from './useDragSentences';

const initialSentences = ['sentence 1', 'sentence 2'];

describe('useDragSentences', () => {
  it('should return available sentences', async () => {
    const { result } = renderHook(useDragSentences, {
      initialProps: { initialSentences: initialSentences },
    });

    await waitFor(() =>
      expect(result.current.initialSentences).toEqual(
        expect.arrayContaining(initialSentences),
      ),
    );
  });

  it('should pick an available sentence', async () => {
    const { result } = renderHook(useDragSentences, {
      initialProps: { initialSentences },
    });

    act(() => result.current.pickFromRight(0));

    await waitFor(() => expect(result.current.pickedFromRightIndex).toBe(0));
  });

  it.each([
    {
      defaultPickedFromRightIndex: 0,
      expectedAvailableSentences: [initialSentences[1]],
    },
    {
      defaultPickedFromRightIndex: 1,
      expectedAvailableSentences: [initialSentences[0]],
    },
  ])(
    'should remove sentence from available sentences when put to left',
    async ({ defaultPickedFromRightIndex, expectedAvailableSentences }) => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences,
          defaultPickedFromRightIndex,
        },
      });

      act(() => result.current.putToLeft());

      await waitFor(() =>
        expect(result.current.availableSentences).toEqual(
          expect.arrayContaining(expectedAvailableSentences),
        ),
      );

      await waitFor(() =>
        expect(result.current.availableSentences.length).toBe(1),
      );
    },
  );
});

/**
 * Scenario
 *
 * on the right side, i can pick sentences
 * sentences picked from the right side can be put on the left side
 * sentences can be picked from the left side and put back on the right side
 * sentences can be rearranged on the left side
 * when all sentences are at the right place on the left side, the user is informed somehow
 *
 * version 1
 * when a sentence is picked on the right side, the remaining elements go up
 * when a sentence is put back on the right side, it is appended at the end of the list
 * sentences cannot be rearranged directly on the left side: they must be put back from left to right first
 *
 * exposed methods:
 * pickFromRight
 *      should tell which of the available sentences is picked
 *      only removed from available sentences when is put to left
 * putToLeft
 *      should remove the sentence from the list of available sentences
 *      should specify at which position the sentence is put
 *      should not accept to put a sentence in a position already occupied
 */
