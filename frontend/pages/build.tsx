import { useState } from "react";
import { HStack, VStack, Text, Input, Switch, Stack } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "../components/dnd";
import { Radio, RadioGroup } from "@chakra-ui/react";

// {
//     Type: “Radio”,
//     Question: “question_text”,
//     Description: “”,
//     isRequired: boolean,
//     Options: [“text1”, “text2”, “text3”...],
//     allowOther: boolean,
//     Option_image: [“src_link1”, “src_link2”]
//     }
// {
//     Type: short_response,
//     Question: “question_text”,
//     Description: “”,
//     isRequired: boolean,
// }

// const elementMap = {
//   "element-1": {
//     id: "element-1",
//     type: "radio",
//     content: "Radio Element",
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
  radio: {
    id: "radio",
    type: "radio",
    content: "Radio Element",
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

const paletteElements = ["radio", "input", "checkbox", "short_text"];

const fetchNewId = () => Math.floor(Math.random() * 1000000).toString();

const Builder = () => {
  const [elements, setElements] = useState<any>(elementMap);
  const [formElements, setFormElements] = useState<string[]>([]);

  const [formJSON, setformJSON] = useState<any>({});
  const [shortTextInputs, setshortTextInputs] = useState<any>({});
  const [shortTextInput, setshortTextInput] = useState<string>("");

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

    // If moving order within the same column
    if (source.droppableId === "form" && destination.droppableId === "form") {
      const newFormElementIds = Array.from(formElements);
      newFormElementIds.splice(source.index, 1); // remove
      newFormElementIds.splice(destination.index, 0, draggableId); // insert

      setFormElements(newFormElementIds);
      return;
    }

    const copiedElement = { ...elements[draggableId], id: fetchNewId() };

    // add element to form map
    formDataMap[copiedElement.id] = copiedElement;

    if (copiedElement.type === "short_text") {
      const shortTextTemplate = {
        type: "short_text",
        question: "",
        description: "",
        isRequired: false,
      };

      setshortTextInputs({
        ...shortTextInputs,
        [copiedElement.id]: shortTextTemplate,
      });
    }

    if (copiedElement.type === "radio") {
      const radioTemplate = {
        type: "radio",
        question: "",
        description: "",
        options: ["Option 1", "Option 2", "Option 3"],
        isRequired: false,
      };

      setshortTextInputs({
        ...shortTextInputs,
        [copiedElement.id]: radioTemplate,
      });
    }

    // add element to form elements and set state
    const formElementIds = Array.from(formElements);
    formElementIds.splice(destination.index, 0, copiedElement.id);
    setFormElements(formElementIds);
  }

  function getHandlerForInput(elemId: string, param: string) {
    console.log("shortTextInputs:", shortTextInputs);
    return (e) => {
      const newshortTextInputs = { ...shortTextInputs };
      if (param === "isRequired") {
        newshortTextInputs[elemId]["isRequired"] = !e.target.checked;
      } else if (param === "selected") {
        newshortTextInputs[elemId]["selected"] = e;
      } else {
        newshortTextInputs[elemId][param] = e.target.value;
      }
      setshortTextInputs(newshortTextInputs);
    };
  }

  // function handleRadioChange(e, id) {
  //   console.log("written: ", e.target.value);
  //   // setshortTextInput(e.target.value);

  //   // overwrite just the description part
  //   const newshortTextInputs = { ...shortTextInputs };
  //   newshortTextInputs[id].question = e.target.value;

  //   // overwrite the entire JSON
  //   setshortTextInputs(newshortTextInputs);
  // }

  const pElements = paletteElements.map((id: string) => elements[id]);
  const fElements = formElements.map((id) => formDataMap[id]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HStack className="container">
        <Palette key="palette" elements={pElements} />
        <Form
          key="form"
          elements={fElements}
          // handleRadioChange={handleRadioChange}
          // shortTextInput={shortTextInput}
          shortTextInputs={shortTextInputs}
          getHandlerForInput={getHandlerForInput}
        />
      </HStack>
    </DragDropContext>
  );
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
            {elements.map((element, idx) => (
              <PaletteElement key={element.id} element={element} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </VStack>
  );
};

type ColumnProps = {
  elements: any;
  // handleRadioChange: (e: any) => void;
  // shortTextInput: string;
  shortTextInputs: any;
  getHandlerForInput: (elemId: string, param: string) => (e: any) => void;
};

const Form = ({
  elements,
  shortTextInputs,
  getHandlerForInput,
}: ColumnProps) => {
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
            {elements.length > 0
              ? elements.map((element, idx) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={idx}
                  >
                    {(provided) =>
                      renderFormElement(
                        element.id,
                        element.type,
                        provided,
                        shortTextInputs,
                        getHandlerForInput
                      )
                    }
                  </Draggable>
                ))
              : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </VStack>
  );
};

const PaletteElement = ({ element, index }) => {
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

function renderFormElement(
  id: string,
  type: string,
  provided: any,
  shortTextInputs: any,
  getHandlerForInput: (elemId: string, param: string) => (e: any) => void
) {
  switch (type) {
    case "short_text":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <VStack w="100%">
            <Input
              placeholder="Enter question"
              onChange={getHandlerForInput(id, "question")}
              value={shortTextInputs[id]["question"]}
            />
            <Input
              placeholder="Enter description"
              onChange={getHandlerForInput(id, "description")}
              value={shortTextInputs[id]["description"]}
            />
            <Input disabled />
            <Text>Required</Text>
            <Switch
              onChange={getHandlerForInput(id, "isRequired")}
              value={shortTextInputs[id]["isRequired"]}
            />
          </VStack>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    case "radio":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <VStack w="100%">
            <Input
              placeholder="Enter question"
              onChange={getHandlerForInput(id, "question")}
              value={shortTextInputs[id]["question"]}
            />
            <Input
              placeholder="Enter description"
              onChange={getHandlerForInput(id, "description")}
              value={shortTextInputs[id]["description"]}
            />
            <RadioGroup>
              <VStack>
                {shortTextInputs[id]["options"].map((option: string) => (
                  <HStack key={option}>
                    <Radio isDisabled />
                    <Input
                      placeholder="Add option"
                      onChange={getHandlerForInput(id, "description")}
                      value={shortTextInputs[id]["description"]}
                    />
                  </HStack>
                ))}
              </VStack>
            </RadioGroup>
          </VStack>
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
    default:
      return <div></div>;
  }
}

export default Builder;
