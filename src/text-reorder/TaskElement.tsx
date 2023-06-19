import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../initial-data';
import { TaskContainer } from '.';

type TaskElementProps = {
  task: Task;
  index: number;
};
export const TaskElement = ({ task, index }: TaskElementProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
};
