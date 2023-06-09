import { renderHook, waitFor } from '@testing-library/react';
import { useDragSentences } from './useDragSentences';

describe('useDragSentences', () => {
  it('should return available sentences', async () => {
    const { result } = renderHook(useDragSentences, {
      initialProps: ['sentence 1', 'sentence 2'],
    });

    await waitFor(() =>
      expect(result.current.sentences).toEqual(
        expect.arrayContaining(['sentence 1', 'sentence 2']),
      ),
    );
  });
});
