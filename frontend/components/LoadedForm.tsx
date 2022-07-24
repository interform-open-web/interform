import { Box, HStack, VStack } from "@chakra-ui/react";
import { Form, Multiselect, Radio, SelectField, TextField } from "@utils/FormElements";
import { useEffect, useState } from "react";
import * as Yup from 'yup';

export const LoadedForm = ({ formSchema }: { formSchema: any }) => {
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(formSchema);
  }, [formSchema]);

  const initForm = (formSchema: any) => {
    let _formData = {} as any;
    let _validationSchema = {} as any;

    for (var formItem of formSchema) {
      let key = formItem.label;

      if (formItem.type === "input") {
        _validationSchema[key] = Yup.string();
      } else if (formItem.type === "email") {
        _validationSchema[key] = Yup.string().email()
      } else if (formItem.type === "select") {
        _validationSchema[key] = Yup.string().oneOf(formItem.options.map((o: any) => o.value));
      } else if (formItem.type === "multiselect") {
        _validationSchema[key] = Yup.string().oneOf(formItem.options.map((o: any) => o.value));
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

  const getFormElement = (elementSchema: any) => {
    if (elementSchema.type === "input") {
      return <TextField type="text" {...elementSchema} />
    }

    if (elementSchema.type === "email") {
      return <TextField type="email" {...elementSchema} />
    }

    if (elementSchema.type === "select") {
      return <SelectField  {...elementSchema} />
    }

    if (elementSchema.type === "multiselect") {
      return <Multiselect  {...elementSchema} />
    }

    if (elementSchema.type === "radio") {
      return <Radio  {...elementSchema} />
    }
  }

  const onSubmit = (values: any, { setSubmitting, resetForm, setStatus }:
    {
      setSubmitting: any;
      resetForm: any;
      setStatus: any;
    }) => {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <div className="App">
      <Form
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={formData}
        onSubmit={onSubmit}
      >
        <VStack gap={2}>
          {formSchema.map((item: any, idx: number) => (
            <Box key={idx} width="100%" >
              {getFormElement(item)}
            </Box>
          ))}
        </VStack>
      </Form>
    </div>
  );
}
