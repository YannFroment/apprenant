import { act, renderHook, waitFor } from '@testing-library/react';
import { useDragSentences } from './useDragSentences';

describe('useDragSentences', () => {
  it('should instantiate the left sentences with as many empty sentences as the initial sentences list', async () => {
    const { result } = renderHook(useDragSentences, {
      initialProps: { initialSentences: ['A', 'B'] },
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
        initialProps: { initialSentences: ['A'] },
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
        expectedRightSentences: ['B'],
      },
      {
        defaultSelectedSentenceFromRightIndex: 1,
        expectedRightSentences: ['A'],
      },
    ])(
      'should remove sentence from right sentences',
      async ({
        defaultSelectedSentenceFromRightIndex,
        expectedRightSentences,
      }) => {
        const { result } = renderHook(useDragSentences, {
          initialProps: {
            initialSentences: ['A', 'B'],
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
        expectedLeftSentences: ['A', ''],
      },
      {
        leftSentenceIndex: 1,
        expectedLeftSentences: ['', 'A'],
      },
    ])(
      'should add sentence to left sentences at a specific position',
      async ({ leftSentenceIndex, expectedLeftSentences }) => {
        const { result } = renderHook(useDragSentences, {
          initialProps: {
            initialSentences: ['A', 'B'],
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

    it('should not move the sentence from the right if targeted left sentence is not empty', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['A', 'B'],
          defaultSelectedSentenceFromRightIndex: 0,
          initialLeftSentences: ['C', '', ''],
        },
      });

      act(() => result.current.moveSentenceFromRightToLeft(0));

      await waitFor(() =>
        expect(result.current.leftSentences).toEqual(
          expect.arrayContaining(['C', '', '']),
        ),
      );

      await waitFor(() =>
        expect(result.current.rightSentences).toEqual(
          expect.arrayContaining(['A', 'B']),
        ),
      );
    });

    it('should erase the selected sentence index after move', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['A', 'B'],
          defaultSelectedSentenceFromRightIndex: 0,
          initialLeftSentences: ['C', '', ''],
        },
      });

      act(() => result.current.moveSentenceFromRightToLeft(0));

      await waitFor(() =>
        expect(result.current.selectedSentenceFromRightIndex).toBeUndefined(),
      );
    });
  });

  describe('selectSentenceFromLeft', () => {
    it('should save the index of a sentence selected from the left ', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: { initialSentences: ['A', 'B'] },
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
          initialSentences: ['C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['A', 'B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToLeft(1));

      await waitFor(() => expect(result.current.leftSentences[0]).toBe('B'));
      await waitFor(() => expect(result.current.leftSentences[1]).toBe('A'));
    });

    it('should erase the selected sentence index after move', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['A', 'B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToLeft(1));

      await waitFor(() =>
        expect(result.current.selectedSentenceFromLeftIndex).toBeUndefined(),
      );
    });
  });

  describe('moveSentenceFromLeftToRight', () => {
    it('should replace moved sentence from the left by empty sentence', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['A', 'B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToRight());

      await waitFor(() =>
        expect(result.current.leftSentences).toEqual(
          expect.arrayContaining(['', 'B']),
        ),
      );
    });

    it('should append moved sentence from the left to right sentences', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['A', 'B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToRight());

      await waitFor(() =>
        expect(result.current.rightSentences).toEqual(
          expect.arrayContaining(['C', 'A']),
        ),
      );
    });

    it('should erase the selected sentence index after move', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          initialLeftSentences: ['A', 'B'],
        },
      });

      act(() => result.current.moveSentenceFromLeftToRight());

      await waitFor(() =>
        expect(result.current.selectedSentenceFromLeftIndex).toBeUndefined(),
      );
    });
  });

  describe('moveSentenceToLeft', () => {
    it('should move from left to left if selected sentence is on the left', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['C'],
          defaultSelectedSentenceFromLeftIndex: 0,
          defaultSelectedSentenceFromRightIndex: undefined,
          initialLeftSentences: ['A', 'B'],
        },
      });

      act(() => result.current.moveSentenceToLeft(1));

      await waitFor(() => expect(result.current.leftSentences[0]).toBe('B'));
      await waitFor(() => expect(result.current.leftSentences[1]).toBe('A'));
    });

    it('should move from right to left if selected sentence is on the right', async () => {
      const { result } = renderHook(useDragSentences, {
        initialProps: {
          initialSentences: ['A'],
          defaultSelectedSentenceFromLeftIndex: undefined,
          defaultSelectedSentenceFromRightIndex: 0,
          initialLeftSentences: ['', 'B'],
        },
      });

      act(() => result.current.moveSentenceToLeft(0));

      await waitFor(() => expect(result.current.leftSentences[0]).toBe('A'));
      await waitFor(() => expect(result.current.rightSentences.length).toBe(0));
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
