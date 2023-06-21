import { toColumnsData, ColumnsData, textChecker } from './ColumnsData';

describe('toColumnsData', () => {
  it('should format sentences into initial data for text reordering', () => {
    const sentences = ['Phrase 3', 'Phrase 1', 'Phrase 2'];

    const initialData = toColumnsData(sentences);

    const expectedInitialData = {
      tasks: {
        'sentence-1': { id: 'sentence-1', content: 'Phrase 3' },
        'sentence-2': { id: 'sentence-2', content: 'Phrase 1' },
        'sentence-3': { id: 'sentence-3', content: 'Phrase 2' },
      },
      columns: {
        'work-zone': {
          id: 'work-zone',
          title: 'work-zone',
          taskIds: [],
        },
        'picking-zone': {
          id: 'picking-zone',
          title: 'picking-zone',
          taskIds: ['sentence-1', 'sentence-2', 'sentence-3'],
        },
      },
      columnOrder: ['work-zone', 'picking-zone'],
    };

    expect(initialData.tasks).toEqual(expectedInitialData.tasks);
    expect(initialData.columns).toEqual(expectedInitialData.columns);
    expect(initialData.columnOrder).toEqual(
      expect.arrayContaining(expectedInitialData.columnOrder),
    );
  });
});

describe('textChecker', () => {
  it('should return false if sentences are not in the right order', () => {
    const orderedSentences = ['A', 'B'];
    const columnsData: ColumnsData = {
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
    expect(textChecker(orderedSentences, columnsData)).toBe(false);
  });
  it('should return true if sentences are not in the right order', () => {
    const orderedSentences = ['A', 'B'];
    const columnsData: ColumnsData = {
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
    expect(textChecker(orderedSentences, columnsData)).toBe(true);
  });
});
