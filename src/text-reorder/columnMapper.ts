import { InitialData, Task } from '../initial-data';

export const columnMapper = (sentences: string[]): InitialData => {
  const tasks = sentences.reduce(
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
  );

  return {
    tasks,
    columns: {
      'work-zone': {
        id: 'work-zone',
        title: 'work-zone',
        taskIds: [],
      },
      'picking-zone': {
        id: 'picking-zone',
        title: 'picking-zone',
        taskIds: Object.keys(tasks),
      },
    },
    columnOrder: ['work-zone', 'picking-zone'],
  };
};
