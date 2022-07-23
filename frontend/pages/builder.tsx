import { useState } from "react";
import data from "./data.json";
import dynamic from "next/dynamic";
import { HStack, VStack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

const DragDropContext = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.DragDropContext;
  },
  { ssr: false }
);

const Droppable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Droppable;
  },
  { ssr: false }
);
const Draggable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Draggable;
  },
  { ssr: false }
);

const Builder = () => {
  const [formData, setFormData] = useState<any>(data);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = formData.columns[source.droppableId];
    const finish = formData.columns[destination.droppableId];

    if (start === finish) {
      const column = formData.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      setFormData({
        ...formData,
        columns: {
          ...formData.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...formData,
      columns: {
        ...formData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setFormData(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HStack>
        {formData.columnOrder.map((columnId: string) => {
          const column = formData.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: string) => formData.tasks[taskId]
          );

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </HStack>
    </DragDropContext>
  );
};

type ColumnProps = {
  column: any;
  tasks: any;
};

const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <VStack className="container">
      <div>{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, idx) => (
              <Task key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </VStack>
  );
};

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="taskContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Builder;
