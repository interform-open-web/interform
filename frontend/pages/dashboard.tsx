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
  Spinner,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "../components/dnd";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { FormNavBar } from "../components/FormNavbar";
import styles from "@styles/dashboard.module.css";
import { SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAuthRequired = false;

  function handlePublish() {
    setIsLoading(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  }

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

  const pElements = paletteElements.map((id: string) => elements[id]);
  const fElements = formElements.map((id) => formDataMap[id]);

  return (
    <>
      <FormNavBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack className={styles.container}>
          <Form
            key="form"
            elements={fElements}
            // handleRadioChange={handleRadioChange}
            // shortTextInput={shortTextInput}
            shortTextInputs={shortTextInputs}
            getHandlerForInput={getHandlerForInput}
            isSubmitted={isSubmitted}
            handlePublish={handlePublish}
            isLoading={isLoading}
            isAuthRequired={isAuthRequired}
          />
        </HStack>
      </DragDropContext>
    </>
  );
};

type ColumnProps = {
  elements: any;
  // handleRadioChange: (e: any) => void;
  // shortTextInput: string;
  shortTextInputs: any;
  getHandlerForInput: (elemId: string, param: string) => (e: any) => void;
  handlePublish: () => void;
  isSubmitted: boolean;
  isLoading: boolean;
  isAuthRequired: boolean;
};

const Form = ({
  elements,
  shortTextInputs,
  getHandlerForInput,
  isSubmitted,
  handlePublish,
  isLoading,
  isAuthRequired,
}: ColumnProps) => {
  return isAuthRequired ? (
    <VStack className={styles.formSubmittedContainer}>
      <Text className={styles.walletTitle}>
        In order to see the survey, you must connect your wallet to the app.
      </Text>
      <Text className={styles.walletSubtitle}>
        Please note that your wallet address may be stored alongside the
        response you submit for this form.
      </Text>
      <ConnectButton />
    </VStack>
  ) : !isSubmitted ? (
    <VStack className={styles.formContainer} spacing={6}>
      <VStack>
        <Text className={styles.formTitle}>Your Dashboard</Text>
        <Text className={styles.formSubtitle}>
          Total: 42, Ongoing: 2, Completed: 40
        </Text>
      </VStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>
            Survey for Orange Pill DAO
          </Text>
          <Text className={styles.formDescription}>
            Responses: 193, Status: In Progress
          </Text>
        </VStack>
        <Button className={styles.editButton}>Edit</Button>
        <Button className={styles.ipfsButton}>View on IPFS</Button>
        <Link href="/responses/QmZLdRXsVkjYAwsPgfD4W5ixV4fGJ6bN3pCGXMP9BAZa4q">
          <Button className={styles.publishButton}>View Responses</Button>
        </Link>
        <Button className={styles.closeButton}>Close Form</Button>
      </HStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>Is Bitcoin our last hope?</Text>
          <Text className={styles.formDescription}>
            Responses: 281, Status: In Progress{" "}
          </Text>
        </VStack>
        <Button className={styles.editButton}>Edit</Button>
        <Button className={styles.ipfsButton}>View on IPFS</Button>
        <Button className={styles.publishButton}>View Responses</Button>
        <Button className={styles.closeButton}>Close Form</Button>
      </HStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>BTC and Digital Money</Text>
          <Text className={styles.formDescription}>
            Responses: 482, Status: Completed
          </Text>
        </VStack>
        <Button className={styles.editButton}>Edit</Button>
        <Button className={styles.ipfsButton}>View on IPFS</Button>
        <Button className={styles.publishButton}>View Responses</Button>
        <Button className={styles.openButton}>Reopen Form</Button>
      </HStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>
            Lightning Network: The Future of Payment
          </Text>
          <Text className={styles.formDescription}>
            Responses: 283, Status: Completed
          </Text>
        </VStack>
        <Button className={styles.editButton}>Edit</Button>
        <Button className={styles.ipfsButton}>View on IPFS</Button>
        <Button className={styles.publishButton}>View Responses</Button>
        <Button className={styles.openButton}>Reopen Form</Button>
      </HStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>
            Jack Dorsey: Savior or Snake?
          </Text>
          <Text className={styles.formDescription}>
            Responses: 954, Status: Completed
          </Text>
        </VStack>
        <Button className={styles.editButton}>Edit</Button>
        <Button className={styles.ipfsButton}>View on IPFS</Button>
        <Button className={styles.publishButton}>View Responses</Button>
        <Button className={styles.openButton}>Reopen Form</Button>
      </HStack>
      <HStack>
        <Text fontWeight="600" cursor="pointer">
          1
        </Text>
        <Text cursor="pointer">2</Text>
        <Text cursor="pointer">3</Text>
        <Text cursor="pointer">4</Text>
        <Text cursor="pointer">5</Text>
        <Text cursor="pointer">6</Text>
        <Text cursor="pointer">7</Text>
      </HStack>
    </VStack>
  ) : (
    <VStack className={styles.formSubmittedContainer}>
      <Text className={styles.successTitle}>
        Your response has been submitted successfully!
      </Text>
      <VStack paddingTop={"2rem"} paddingBottom={"2rem"}>
        <a
          href="https://gateway.pinata.cloud/ipfs/QmT6MmYhq1CfMKExERzvYH4yqGv4mF2hUrGr9uqThofheX"
          rel="noreferrer"
          target="_blank"
        >
          <Text className={styles.successSubtitle}>
            IPFS CID: QmT6MmYhq1CfMKExERzvYH4yqGv4mF2hUrGr9uqThofheX
          </Text>
        </a>
      </VStack>
      <Button className={styles.publishButton}>Go Back to Form</Button>
    </VStack>
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
          <Image alt="placeholder image" src={`/${type}.png`} />
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
