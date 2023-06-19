type TaskId = string;
type ColumnId = string;

export type Task = { id: TaskId; content: string };
export type Column = { id: ColumnId; title: string; taskIds: TaskId[] };

export type ColumnsFormat = {
  tasks: Record<TaskId, Task>;
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
};

export const columnMapper = (sentences: string[]): ColumnsFormat => {
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
