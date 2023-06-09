import { act, renderHook, waitFor } from '@testing-library/react';
import { useDragSentences } from './useDragSentences';

const initialSentences = ['sentence 1', 'sentence 2'];

describe('useDragSentences', () => {
  it('should instantiate the left sentences with as many empty sentences as the initial sentences list', async () => {
    const { result } = renderHook(useDragSentences, {
      initialProps: { initialSentences },
    });

    await waitFor(() =>
      expect(result.current.leftSentences).toEqual(
        expect.arrayContaining(['', '']),
      ),
    );
  });

  describe('selectSentenceFromRight', () => {
    it('should save the index of a sentence selected from the right', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: { initialSentences },
      });

      act(() => result.current.selectSentenceFromRight(0));

      await waitFor(() =>
        expect(result.current.selectedSentenceFromRightIndex).toBe(0),
      );
    });
  });

  describe('moveSentenceFromRightToLeft', () => {
    it.each([
      {
        defaultSelectedSentenceFromRightIndex: 0,
        expectedRightSentences: [initialSentences[1]],
      },
      {
        defaultSelectedSentenceFromRightIndex: 1,
        expectedRightSentences: [initialSentences[0]],
      },
    ])(
      'should remove sentence from right sentences',
      async ({
        defaultSelectedSentenceFromRightIndex,
        expectedRightSentences,
      }) => {
        const { result } = renderHook(useDragSentences, {
          initialProps: {
            initialSentences,
            defaultSelectedSentenceFromRightIndex,
          },
        });

        act(() => result.current.moveSentenceFromRightToLeft(0));

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
            defaultSelectedSentenceFromRightIndex: 0,
          },
        });

        act(() =>
          result.current.moveSentenceFromRightToLeft(leftSentenceIndex),
        );

        await waitFor(() =>
          expect(result.current.leftSentences).toEqual(
            expect.arrayContaining(expectedLeftSentences),
          ),
        );
      },
    );
  });

  describe('selectSentenceFromLeft', () => {
    it('should save the index of a sentence selected from the left ', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: { initialSentences },
      });

      act(() => result.current.selectSentenceFromLeft(0));

      await waitFor(() =>
        expect(result.current.selectedSentenceFromLeftIndex).toBe(0),
      );
    });
  });

  describe('moveSentenceFromLeftToLeft', () => {
    it('should swap left sentences', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: [initialSentences[1]],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['sentence A', 'sentence B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToLeft(1));

      await waitFor(() =>
        expect(result.current.leftSentences[0]).toBe('sentence B'),
      );
      await waitFor(() =>
        expect(result.current.leftSentences[1]).toBe('sentence A'),
      );
    });
  });

  describe('moveSentenceFromLeftToRight', () => {
    it('should replace moved sentence from the left by empty sentence', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['sentence C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['sentence A', 'sentence B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToRight());

      await waitFor(() =>
        expect(result.current.leftSentences).toEqual(
          expect.arrayContaining(['', 'sentence B']),
        ),
      );
    });

    it('should append moved sentence from the left to right sentences', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['sentence C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['sentence A', 'sentence B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToRight());

      await waitFor(() =>
        expect(result.current.rightSentences).toEqual(
          expect.arrayContaining(['sentence C', 'sentence A']),
        ),
      );
    });
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
 * putFromRightToLeft
 *      should remove the sentence from the list of available sentences
 *      should specify at which position the sentence is put
 *      should not accept to put a sentence in a position already occupied
 */
