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
import { FormNavBar } from "../../components/FormNavbar";
import styles from "@styles/response.module.css";

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

  const pElements = paletteElements.map((id: string) => elements[id]);
  const fElements = formElements.map((id) => formDataMap[id]);

  return (
    <>
      <FormNavBar />
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
      <HStack>
        <VStack>
          <Text className={styles.formTitle}>
            Responses: Survey for Orange Pill DAO
          </Text>
          <Text className={styles.formSubtitle}>
            Responses: 193, Status: In Progress
          </Text>
        </VStack>
        <a
          href="https://gateway.pinata.cloud/ipfs/QmSnhRNQ6o9kQ3AWVfQUu2qRkJ7U6dfgk3NqeU7s53kJ6w"
          rel="noreferrer"
          target="_blank"
        >
          <Button className={styles.ipfsButton}>View on IPFS</Button>
        </a>
      </HStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>
            How do you feel about what the government has done to our economy
            over these past few years? *
          </Text>
          <Box className={styles.formResponseContainer}>
            <Text className={styles.formSubtitle}>Angry and heartbroken</Text>
          </Box>
          <Box className={styles.formResponseContainer}>
            <Text className={styles.formSubtitle}>
              Deeply saddened by their monetary policies
            </Text>
          </Box>
          <Box className={styles.formResponseContainer}>
            <Text className={styles.formSubtitle}>
              I bought the top, sold the low, ain’t got nowhere to go...
            </Text>
          </Box>
          <Box className={styles.formResponseContainer}>
            <Text className={styles.formSubtitle}>
              I feel rejuvenated in my conviction that decentralized digital
              currency is the future.
            </Text>
          </Box>
          <Box className={styles.formResponseContainer}>
            <Text className={styles.formSubtitle}>
              bro wassup! this form is so dope
            </Text>
          </Box>
        </VStack>
      </HStack>
      <HStack className={styles.formElementContainer}>
        <VStack w="100%" justifyContent="flex-start" alignItems="flex-start">
          <Text className={styles.formQuestion}>
            In the last year have you attended any events to support the great
            orange cause? *
          </Text>
          <Box className={styles.formResponseContainer}>
            <HStack>
              <Box className={styles.yes}></Box>
              <Text className={styles.formSubtitle}>{"Yes (41.2%)"}</Text>
            </HStack>
            <HStack>
              <Box className={styles.no}></Box>
              <Text className={styles.formSubtitle}>{"No (58.8%)"}</Text>
            </HStack>
          </Box>
          <Image src="/pie.png"></Image>
        </VStack>
      </HStack>
      {/* <HStack>
        <Text fontWeight="600" cursor="pointer">
          1
        </Text>
        <Text cursor="pointer">2</Text>
        <Text cursor="pointer">3</Text>
        <Text cursor="pointer">4</Text>
        <Text cursor="pointer">5</Text>
        <Text cursor="pointer">6</Text>
        <Text cursor="pointer">7</Text>
      </HStack> */}
    </VStack>
  ) : (
    <VStack className={styles.formSubmittedContainer}>
      <Text className={styles.successTitle}>
        Your response has been submitted successfully!
      </Text>
      <VStack paddingTop={"2rem"} paddingBottom={"2rem"}>
        <a
          href="https://gateway.pinata.cloud/ipfs/QmSnhRNQ6o9kQ3AWVfQUu2qRkJ7U6dfgk3NqeU7s53kJ6w"
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

export default Builder;
