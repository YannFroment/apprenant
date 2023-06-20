import styled from 'styled-components';
import { StrictModeDroppable } from './StrictModeDroppable';
import { TaskElement, TaskList } from './TaskElement';
import { Column, Task } from './toColumnsData';

export const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
export const Title = styled.h3`
  padding: 8px;
`;

type ColumnElementProps = {
  column: Column;
  tasks: Task[];
};
export const ColumnElement = ({ column, tasks }: ColumnElementProps) => {
  return (
    <Container data-testid={`column-${column.id}`}>
      <Title>{column.title}</Title>
      <StrictModeDroppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            data-testid={`tasklist-${column.id}`}
          >
            {tasks.map((task, index) => (
              <TaskElement key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </StrictModeDroppable>
    </Container>
  );
};
