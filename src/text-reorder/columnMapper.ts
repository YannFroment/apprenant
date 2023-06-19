import { InitialData, Task } from '../initial-data';

export const columnMapper = (sentences: string[]): InitialData => {
  const taskIds = sentences.map((_, index) => `sentence-${index + 1}`);

  return {
    tasks: sentences.reduce(
      (
        tasksAccumulator: Record<string, Task>,
        sentence: string,
        index: number,
      ) => {
        const id = `sentence-${index + 1}`;
        const tasks = {
          ...tasksAccumulator,
          [id]: {
            id,
            content: sentence,
          },
        };

        return tasks;
      },
      {},
    ),
    columns: {
      'work-zone': {
        id: 'work-zone',
        title: 'work-zone',
        taskIds: [],
      },
      'picking-zone': {
        id: 'picking-zone',
        title: 'picking-zone',
        taskIds,
      },
    },
    columnOrder: ['work-zone', 'picking-zone'],
  };
};
