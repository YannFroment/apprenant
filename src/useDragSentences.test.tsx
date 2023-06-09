import { act, renderHook, waitFor } from '@testing-library/react';
import { useDragSentences } from './useDragSentences';

const initialSentences = ['sentence 1', 'sentence 2'];

describe('useDragSentences', () => {
  it('should instantiate the left sentences with as many empty elements as the initial sentences list', async () => {
    const { result } = renderHook(useDragSentences, {
      initialProps: { initialSentences },
    });

    await waitFor(() =>
      expect(result.current.leftSentences).toEqual(
        expect.arrayContaining(['', '']),
      ),
    );
  });

  describe('putToLeft', () => {
    it.each([
      {
        defaultPickedFromRightIndex: 0,
        expectedRightSentences: [initialSentences[1]],
      },
      {
        defaultPickedFromRightIndex: 1,
        expectedRightSentences: [initialSentences[0]],
      },
    ])(
      'should remove sentence from right sentences',
      async ({ defaultPickedFromRightIndex, expectedRightSentences }) => {
        const { result } = renderHook(useDragSentences, {
          initialProps: {
            initialSentences,
            defaultPickedFromRightIndex,
          },
        });

        act(() => result.current.putToLeft(0));

        await waitFor(() =>
          expect(result.current.rightSentences).toEqual(
            expect.arrayContaining(expectedRightSentences),
          ),
        );

        await waitFor(() =>
          expect(result.current.rightSentences.length).toBe(1),
        );
      },
    );

    it.each([
      {
        leftSentenceIndex: 0,
        expectedLeftSentences: [initialSentences[0], ''],
      },
      {
        leftSentenceIndex: 1,
        expectedLeftSentences: ['', initialSentences[0]],
      },
    ])(
      'should add sentence to left sentences at a specific position',
      async ({ leftSentenceIndex, expectedLeftSentences }) => {
        const { result } = renderHook(useDragSentences, {
          initialProps: {
            initialSentences,
            defaultPickedFromRightIndex: 0,
          },
        });

        act(() => result.current.putToLeft(leftSentenceIndex));

        await waitFor(() =>
          expect(result.current.leftSentences).toEqual(
            expect.arrayContaining(expectedLeftSentences),
          ),
        );
      },
    );
  });
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
