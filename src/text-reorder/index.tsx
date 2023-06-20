import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ColumnElement } from './ColumnElement';
import { Column, ColumnsData, columnMapper } from './columnMapper';
import { columnChecker } from './columnChecker';

type TextReorderTrainingProps = {
  orderedSentences: string[];
  randomizedSentences: string[];
  defaultColumnsFormat?: ColumnsData;
};

// TODO
/**
 * remove "training" suffix everywhere
 * rename columnChecker
 * rename columnMapper
 * move togethre columnChecker & columnMapper
 *
 */

export const TextReorderTraining = ({
  orderedSentences,
  randomizedSentences,
  defaultColumnsFormat,
}: TextReorderTrainingProps) => {
  const [columnsData, setColumnsData] = useState<ColumnsData>(
    defaultColumnsFormat ?? columnMapper(randomizedSentences),
  );
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

    const startColumn = columnsData.columns[source.droppableId];
    const finishColumn = columnsData.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn: Column = { ...startColumn, taskIds: newTaskIds };
      setColumnsData({
        ...columnsData,
        columns: { ...columnsData.columns, [newColumn.id]: newColumn },
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

    setColumnsData({
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const textIsReordered = columnChecker(orderedSentences, columnsData);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnsData.columnOrder.map((columnId) => {
        const column = columnsData.columns[columnId];
        const tasks = column.taskIds.map((taskId) => columnsData.tasks[taskId]);

        return <ColumnElement key={column.id} column={column} tasks={tasks} />;
      })}
      {textIsReordered && <div data-testid="text-success">&#9989;</div>}
    </DragDropContext>
  );
};
