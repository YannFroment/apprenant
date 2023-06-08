type TaskId = string;
type ColumnId = string;

export type Task = { id: TaskId; content: string };
export type Column = { id: ColumnId; title: string; taskIds: TaskId[] };

export type InitialData = {
  tasks: Record<TaskId, Task>;
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
};

export const initialData: InitialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'First task' },
    'task-2': { id: 'task-2', content: 'Second task' },
  },
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
