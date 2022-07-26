import { useState } from "react";
import {
  HStack,
  VStack,
  Text,
  Input,
  Switch,
  Stack,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "../components/dnd";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { BuilderNavBar } from "../components/BuilderNavbar";
import styles from "@styles/Build.module.css";
import { SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

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
  short_text: {
    id: "short_text",
    type: "short_text",
    content: "Short Response",
  },
  long_text: {
    id: "long_text",
    type: "long_text",
    content: "Long Response",
  },
  checkbox: {
    id: "checkbox",
    type: "checkbox",
    content: "Checkbox",
  },
  dropdown: {
    id: "dropdown",
    type: "dropdown",
    content: "Dropdown",
  },
  radio: {
    id: "radio",
    type: "radio",
    content: "Radio",
  },
  image: {
    id: "image",
    type: "image",
    content: "Image",
  },
  date: {
    id: "date",
    type: "date",
    content: "Date",
  },
  geolocation: {
    id: "geolocation",
    type: "geolocation",
    content: "Geolocation",
  },
  text: {
    id: "text",
    type: "text",
    content: "Text",
  },
  video: {
    id: "video",
    type: "video",
    content: "Video",
  },
};

const formDataMap = {} as any;

const paletteElements = [
  "short_text",
  "long_text",
  "checkbox",
  "dropdown",
  "radio",
  "image",
  "date",
  "geolocation",
  "text",
  "video",
];

const fetchNewId = () => Math.floor(Math.random() * 1000000).toString();

const Builder = () => {
  const [elements, setElements] = useState<any>(elementMap);
  const [formElements, setFormElements] = useState<string[]>([]);

  const [formJSON, setformJSON] = useState<any>({});
  const [shortTextInputs, setshortTextInputs] = useState<any>({});
  const [shortTextInput, setshortTextInput] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
        options: ["Option 1", "Option 2"],
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
    return (e: any) => {
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
    <>
      <BuilderNavBar setIsSubmitted={setIsSubmitted} />
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack className={styles.container}>
          <Palette key="palette" elements={pElements} shortTextInputs={undefined} getHandlerForInput={function (elemId: string, param: string): (e: any) => void {
            throw new Error("Function not implemented.");
          }} isSubmitted={false} />
          <Form
            key="form"
            elements={fElements}
            // handleRadioChange={handleRadioChange}
            // shortTextInput={shortTextInput}
            shortTextInputs={shortTextInputs}
            getHandlerForInput={getHandlerForInput}
            isSubmitted={isSubmitted}
          />
        </HStack>
      </DragDropContext>
    </>
  );
};

const Palette = ({ elements }: ColumnProps) => {
  return (
    <VStack className={styles.paletteContainer}>
      <div className={styles.paletteTitle}>{"ELEMENTS"}</div>
      <Droppable droppableId={"palette"}>
        {(provided) => (
          <SimpleGrid
            columns={2}
            className={styles.paletteDroppableContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {elements.map((element: any, idx: any) => (
              <PaletteElement key={element.id} element={element} index={idx} />
            ))}
            {provided.placeholder}
          </SimpleGrid>
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
  isSubmitted: boolean;
};

const Form = ({
  elements,
  shortTextInputs,
  getHandlerForInput,
  isSubmitted,
}: ColumnProps) => {
  return !isSubmitted ? (
    <VStack className={styles.formContainer}>
      <Box className={styles.formInputContainer}>
        <Input
          placeholder="Your Form"
          fontSize="2rem"
          fontWeight="700"
          fontFamily="Montserrat"
        ></Input>
      </Box>
      <Droppable droppableId={"form"}>
        {(provided) => (
          <VStack
            className={styles.formDroppableContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={3}
          >
            {elements.length > 0
              ? elements.map((element: any, idx: any) => (
                <Draggable
                  key={element.id}
                  draggableId={element.id}
                  index={idx}
                >
                  {(provided) =>
                    renderFormElement(
                      element.id,
                      element.type,
                      element.imgUrl,
                      provided,
                      shortTextInputs,
                      getHandlerForInput
                    )
                  }
                </Draggable>
              ))
              : null}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </VStack>
  ) : (
    <VStack className={styles.formSubmittedContainer}>
      <Text className={styles.successTitle}>
        Your form has been published successfully!
      </Text>
      <VStack paddingTop={"2rem"} paddingBottom={"2rem"}>
        <Link href={`/QmZLdRXsVkjYAwsPgfD4W5ixV4fGJ6bN3pCGXMP9BAZa4q`}>
          <Text className={styles.successSubtitleLink}>
            Share with:
            launch.interform.app/QmZLdRXsVkjYAwsPgfD4W5ixV4fGJ6bN3pCGXMP9BAZa4q
          </Text>
        </Link>
        <a
          href="https://gateway.pinata.cloud/ipfs/QmZLdRXsVkjYAwsPgfD4W5ixV4fGJ6bN3pCGXMP9BAZa4q"
          rel="noreferrer"
          target="_blank"
        >
          <Text className={styles.successSubtitle}>
            IPFS CID: QmZLdRXsVkjYAwsPgfD4W5ixV4fGJ6bN3pCGXMP9BAZa4q
          </Text>
        </a>
      </VStack>
      <Button className={styles.publishButton}>Go Back to Form</Button>
    </VStack>
  );
};

const PaletteElement = ({ element, index }: { element: any, index: any }) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <VStack
          className={styles.paletteElementContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Image alt="placeholder" src={`/${element.id}.png`} className={styles.elementImage} />
          <Text>{element.content}</Text>
        </VStack>
      )}
    </Draggable>
  );
};

function renderFormElement(
  id: string,
  type: string,
  imgUrl: string,
  provided: any,
  shortTextInputs: any,
  getHandlerForInput: (elemId: string, param: string) => (e: any) => void
) {
  switch (type) {
    case "short_text":
      return (
        <HStack
          className={styles.formElementContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <VStack w="100%">
            <Input
              className={styles.formElementInput}
              placeholder="Enter question"
              onChange={getHandlerForInput(id, "question")}
              value={shortTextInputs[id]["question"]}
              fontSize="1.4rem"
              fontWeight="500"
              fontFamily="Montserrat"
            />
            <Box className={styles.formElementTextBox}></Box>
          </VStack>
          <VStack>
            <Text>Required</Text>
            <Switch
              onChange={getHandlerForInput(id, "isRequired")}
              value={shortTextInputs[id]["isRequired"]}
              colorScheme="purple"
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
          className={styles.formRadioElementContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <VStack w="100%">
            <Input
              placeholder="Enter question"
              onChange={getHandlerForInput(id, "question")}
              value={shortTextInputs[id]["question"]}
              fontSize="1.4rem"
              fontWeight="500"
              fontFamily="Montserrat"
            />
            <RadioGroup w="100%">
              <VStack w="100%">
                {shortTextInputs[id]["options"].map((option: string) => (
                  <HStack key={option} className={styles.radioOptionContainer}>
                    <Radio isDisabled />
                    <Input
                      placeholder="Add option"
                      // onChange={getHandlerForInput(id, "description")}
                      // value={shortTextInputs[id]["description"]}
                      w="400px"
                      fontSize="1rem"
                      fontFamily="Montserrat"
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
          className={styles.elementContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text>{type}</Text>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    case "checkbox":
      return (
        <HStack
          className={styles.elementContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Image alt="placeholder iamge" src={`/${type}.png`} />
          <Text>{type}</Text>
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
