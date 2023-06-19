import { InitialData, Task } from '../initial-data';

export const columnMapper = (sentences: string[]): InitialData => {
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
      'column-1': {
        id: 'column-1',
        title: 'left ',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'right',
        taskIds: ['task-1', 'task-2'],
      },
    },
    columnOrder: ['column-1', 'column-2'],
  };
};
