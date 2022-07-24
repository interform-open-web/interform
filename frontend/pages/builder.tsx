import { useState } from "react";
import data from "./data.json";
import dynamic from "next/dynamic";
import { HStack, VStack, Text } from "@chakra-ui/react";
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

    const startColumn = formData.columns[source.droppableId];
    const destColumn = formData.columns[destination.droppableId];

    // If moving order within the same column
    if (startColumn === destColumn) {
      const column = formData.columns[source.droppableId];
      const newElementIds = Array.from(column.elementIds);
      newElementIds.splice(source.index, 1);
      newElementIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        elementIds: newElementIds,
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

    // new elements
    const newElements = JSON.parse(JSON.stringify(formData.elements));

    // make copy of dragged element
    const copiedElement = JSON.parse(
      JSON.stringify(formData.elements[draggableId])
    );
    const copiedElementId = Number(Object.keys(formData.elements).length) + 1;
    const newElementId = `element-${copiedElementId}`;
    copiedElement.id = newElementId;

    // add new element to new elements
    newElements[copiedElement.id] = copiedElement;

    const destElementIds = Array.from(destColumn.elementIds);
    destElementIds.splice(destination.index, 0, copiedElement.id);
    const newFinish = {
      ...destColumn,
      elementIds: destElementIds,
    };

    const newState = {
      elements: newElements,
      columns: {
        ...formData.columns,
        // [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
      columnOrder: formData.columnOrder,
    };
    setFormData(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HStack>
        {formData.columnOrder.map((columnId: string) => {
          const column = formData.columns[columnId];
          const elements = column.elementIds.map(
            (elementId: string) => formData.elements[elementId]
          );

          return <Column key={column.id} column={column} elements={elements} />;
        })}
      </HStack>
    </DragDropContext>
  );
};

type ColumnProps = {
  column: any;
  elements: any;
};

const Column = ({ column, elements }: ColumnProps) => {
  return (
    <VStack className="container">
      <div>{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className={
              column.id === "column-1" ? "sourceContainer" : "destContainer"
            }
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {elements.map((element, idx) => (
              <Element key={element.id} element={element} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </VStack>
  );
};

const Element = ({ element, index }) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* <div
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        > */}
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
          <Text>{element.content}</Text>
          {/* </div> */}
        </HStack>
      )}
    </Draggable>
  );
};

export default Builder;
