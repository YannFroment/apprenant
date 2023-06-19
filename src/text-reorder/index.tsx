import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column, InitialData, initialData } from '../initial-data';
import { ColumnElement } from './ColumnElement';

type TextReorderTrainingProps = {
  sentences: string[];
};

export const TextReorderTraining = ({
  sentences,
}: TextReorderTrainingProps) => {
  const [data, setData] = useState<InitialData>(initialData);
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn: Column = { ...startColumn, taskIds: newTaskIds };
      setData({
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      });

      return;
    }

    const startTaskIds = [...startColumn.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = [...finishColumn.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <ColumnElement key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};
