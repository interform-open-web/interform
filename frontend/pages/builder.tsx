import { useState } from "react";
import { HStack, VStack, Text, Input, Box, Stack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "../components/dnd";

// {
//     Type: “Select”,
//     Question: “question_text”,
//     Description: “”,
//     isRequired: boolean,
//     Options: [“text1”, “text2”, “text3”...],
//     allowOther: boolean,
//     Option_image: [“src_link1”, “src_link2”]
//     }

// const elementMap = {
//   "element-1": {
//     id: "element-1",
//     type: "select",
//     content: "Select Element",
//   },
//   "element-2": {
//     id: "element-2",
//     type: "input",
//     content: "Input Element",
//   },
//   "element-3": {
//     id: "element-3",
//     type: "checkbox",
//     content: "Checkbox Element",
//   },
//   "element-4": {
//     id: "element-4",
//     type: "short_text",
//     content: "Short Response Element",
//   },
// };

const elementMap = {
  select: {
    id: "select",
    type: "select",
    content: "Select Element",
  },
  input: {
    id: "input",
    type: "input",
    content: "Input Element",
  },
  checkbox: {
    id: "checkbox",
    type: "checkbox",
    content: "Checkbox Element",
  },
  short_text: {
    id: "short_text",
    type: "short_text",
    content: "Short Response Element",
  },
};

const formDataMap = {} as any;

const paletteElements = ["select", "input", "checkbox", "short_text"];

const fetchNewId = () => Math.floor(Math.random() * 1000000).toString();

const Builder = () => {
  const [elements, setElements] = useState<any>(elementMap);
  const [formElements, setFormElements] = useState<string[]>([]);

  function onDragEnd(result: any) {
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

    // If moving order within the same column
    if (source.droppableId === "form" && destination.droppableId === "form") {
      const newFormElements = Array.from(formElements);
      newFormElements.splice(source.index, 1); // remove
      newFormElements.splice(destination.index, 0, draggableId); // insert

      setFormElements(newFormElements);
      return;
    }

    const copiedElement = { ...elements[draggableId], id: fetchNewId() };

    // add element to form map
    formDataMap[copiedElement.id] = copiedElement;

    // add element to form elements and set state
    const formElementIds = Array.from(formElements);
    formElementIds.splice(destination.index, 0, copiedElement.id);
    setFormElements(formElementIds);
  }

  const pElements = paletteElements.map((id: string) => elements[id]);
  const fElements = formElements.map((id) => formDataMap[id]);

  return (
    <Box paddingTop={20}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack className="container" spacing={[1, 5]} direction={['column', 'column', 'row']}>
          <Palette key="palette" elements={pElements} />
          <Form key="form" elements={fElements} />
        </Stack>
      </DragDropContext>
    </Box>
  );
};

type ColumnProps = {
  elements: any;
};

const Palette = ({ elements }: ColumnProps) => {
  return (
    <VStack className="paletteContainer">
      <div>{"Palette"}</div>
      <Droppable droppableId={"palette"}>
        {(provided) => (
          <div
            className="paletteDroppableContainer"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {elements.map((element: any, idx: number) => (
              <PaletteElement key={element.id} element={element} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </VStack>
  );
};

const Form = ({ elements }: ColumnProps) => {
  return (
    <VStack className="formContainer">
      <div>{"Your Form"}</div>
      <Droppable droppableId={"form"}>
        {(provided) => (
          <div
            className="formDroppableContainer"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {elements.map((element: any, idx: number) => (
              <FormElement key={element.id} element={element} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </VStack>
  );
};

const PaletteElement = ({ element, index }: { element: any, index: any }) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
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

const FormElement = ({ element, index }: { element: any, index: any }) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => renderFormElement(element.type, element, provided)}
    </Draggable>
  );
};

function renderFormElement(type: string, element: any, provided: any) {
  switch (type) {
    case "select":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text>{element.content}</Text>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    case "input":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text>{element.content}</Text>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    case "checkbox":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text>{element.content}</Text>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    case "short_text":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <VStack w="100%">
            <Input placeholder="Enter question" />
            <Input disabled />
          </VStack>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    default:
      return <div></div>;
  }
}

export default Builder;
