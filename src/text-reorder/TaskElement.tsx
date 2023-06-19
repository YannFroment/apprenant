import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task } from './columnMapper';

export const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'darkgrey' : 'inherit'};
`;

export const TaskContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'red' : 'inherit')};
`;

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
