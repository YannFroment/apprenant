import { columnMapper } from './columnMapper';

describe('columnMapper', () => {
  it('should transform sentences into initial data for text reordering', () => {
    const sentences = ['Phrase 3', 'Phrase 1', 'Phrase 2'];

    const initialData = columnMapper(sentences);

    // Expected shape of the result
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
          taskIds: ['sentence-1', 'sentence-2', 'sentence-3'],
        },
        'picking-zone': {
          id: 'picking-zone',
          title: 'picking-zone',
          taskIds: [],
        },
      },
      columnOrder: ['work-zone', 'picking-zone'],
    };

    expect(initialData.tasks).toEqual(expectedInitialData.tasks);
    // expect(initialData.columns).toEqual(expectedInitialData.columns);
    // expect(initialData.columnOrder).toEqual(
    //   expect.arrayContaining(expectedInitialData.columnOrder),
    // );
  });
});
