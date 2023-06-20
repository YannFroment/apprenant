import { columnChecker } from './columnChecker';
import { ColumnsFormat } from './columnMapper';

describe('columnChecker', () => {
  it('should return false if sentences are not in the right order', () => {
    const orderedSentences = ['A', 'B'];
    const columnsFormat: ColumnsFormat = {
      tasks: {
        'sentence-1': { id: 'sentence-1', content: 'A' },
        'sentence-2': { id: 'sentence-2', content: 'B' },
      },
      columns: {
        'work-zone': {
          id: 'work-zone',
          title: 'work-zone',
          taskIds: ['sentence-2', 'sentence-1'],
        },
        'picking-zone': {
          id: 'picking-zone',
          title: 'picking-zone',
          taskIds: [],
        },
      },
      columnOrder: ['work-zone', 'picking-zone'],
    };
    expect(columnChecker(orderedSentences, columnsFormat)).toBe(false);
  });
  it('should return true if sentences are not in the right order', () => {
    const orderedSentences = ['A', 'B'];
    const columnsFormat: ColumnsFormat = {
      tasks: {
        'sentence-1': { id: 'sentence-1', content: 'A' },
        'sentence-2': { id: 'sentence-2', content: 'B' },
      },
      columns: {
        'work-zone': {
          id: 'work-zone',
          title: 'work-zone',
          taskIds: ['sentence-1', 'sentence-2'],
        },
        'picking-zone': {
          id: 'picking-zone',
          title: 'picking-zone',
          taskIds: [],
        },
      },
      columnOrder: ['work-zone', 'picking-zone'],
    };
    expect(columnChecker(orderedSentences, columnsFormat)).toBe(true);
  });
});
