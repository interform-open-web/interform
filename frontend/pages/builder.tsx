import { useState, useEffect } from "react";
import { HStack, VStack, Text, Input, Box, Stack, Switch, FormControl, FormLabel, List } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "../components/dnd";
import { Form as FormikForm } from "@utils/FormElements";
import * as Yup from 'yup';
import { Field } from "formik";
import { AddOption } from "@components/BuilderElements";

const elementMap = {
  select: {
    id: "select",
    type: "select",
    content: "Select Element",
  },
  multi_select: {
    id: "multi_select",
    type: "multi_select",
    content: "Checkbox Element",
  },
  short_text: {
    id: "short_text",
    type: "short_text",
    content: "Short Response Element",
  },
  long_input: {
    id: "long_input",
    type: "long_input",
    content: "Long Response Element",
  },
  radio: {
    id: "radio",
    type: "radio",
    content: "Radio Element",
  },
};

const formDataMap = {} as any;

const paletteElements = ["short_text", "long_input", "select", "multi_select", "radio"];

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
      <h1>Form Elements</h1>
      <Text>Pick elements to add to your form</Text>
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
  const [formSchema, setFormSchema] = useState([]);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    if (formSchema.length === 0) { return; }
    initForm(formSchema);
  }, [formSchema]);

  const initForm = (formSchema: any) => {
    let _formData = {} as any;
    let _validationSchema = {} as any;

    for (var formItem of formSchema) {
      let key = formItem.label;
      _formData[key] = "";

      if (formItem.type === "input") {
        _validationSchema[key] = Yup.string();
      } else if (formItem.type === "longinput") {
        _validationSchema[key] = Yup.string();
      } else if (formItem.type === "email") {
        _validationSchema[key] = Yup.string().email()
      } else if (formItem.type === "select") {
        _validationSchema[key] = Yup.string().oneOf(formItem.options.map((o: any) => o.value));
      } else if (formItem.type === "multiselect") {
        _validationSchema[key] = Yup.array();
      } else if (formItem.type === "radio") {
        _validationSchema[key] = Yup.string().oneOf(formItem.options.map((o: any) => o.value));
      } else {
        _validationSchema[key] = Yup.string();
      }

      if (formItem.isRequired) {
        _validationSchema[key] = _validationSchema[key].required('Required');
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  }

  const onSubmit = (values: any, { setSubmitting, resetForm, setStatus }:
    {
      setSubmitting: any;
      resetForm: any;
      setStatus: any;
    }) => {
    console.log('values', values)
    setSubmitting(false);
  }

  return (
    <FormikForm
      enableReinitialize
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <VStack className="formContainer">
        <Field
          type="text"
          as={Input}
          name="formName"
          id="formName"
          placeholder={"Your Form"}
        />
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
    </FormikForm >
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
          <VStack w="100%">
            <Text>{element.content}</Text>
            <Text fontWeight="bold">{element.content}</Text>
            <Input placeholder="Enter question" />
            <Input placeholder="Enter description" />
            <AddOption />
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='is-required' mb='0'>
                Required question?
              </FormLabel>
              <Switch id='is-required' />
            </FormControl>
          </VStack>
          <div className="handle" {...provided.dragHandleProps}>
            <DragHandleIcon />
          </div>
        </HStack>
      );
    case "multi_select":
      return (
        <HStack
          className="elementContainer"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <VStack w="100%">
            <Text fontWeight="bold">{element.content}</Text>
            <Input placeholder="Enter question" />
            <Input placeholder="Enter description" />
            <AddOption />
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='is-required' mb='0'>
                Required question?
              </FormLabel>
              <Switch id='is-required' />
            </FormControl>
          </VStack>
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
            <Text fontWeight="bold">{element.content}</Text>
            <Input placeholder="Enter question" />
            <Input placeholder="Enter description" />
            <Input placeholder="Enter placeholder (optional)" />
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='is-required' mb='0'>
                Required question?
              </FormLabel>
              <Switch id='is-required' />
            </FormControl>
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
            <Text fontWeight="bold">{element.content}</Text>
            <Input placeholder="Enter question" />
            <Input placeholder="Enter description" />
            <AddOption />
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='is-required' mb='0'>
                Required question?
              </FormLabel>
              <Switch id='is-required' />
            </FormControl>
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