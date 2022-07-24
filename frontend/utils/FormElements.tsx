// FormElements.jsx

import React from 'react';
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  useFormikContext,
  Field,
} from 'formik';
import { Checkbox, CheckboxGroup, HStack, Input, RadioGroup, Select, Stack, Text, Radio as ChakraRadio, Textarea, Button } from '@chakra-ui/react';

export function Form(props: any) {
  const { onSubmit } = props;
  return (
    <Formik
      {...props}
    >
      <FormikForm className="needs-validation">
        {props.children}
      </FormikForm>
    </Formik>)
}

export function TextField(props: any) {
  const { question, description, label, placeholder, isRequired, ...rest } = props;

  return (
    <>
      <HStack>
        <h3>{question}</h3>
        {isRequired && <Text color="red.400">*</Text>}
      </HStack>
      {description && <Text color="gray.600">{description}</Text>}
      <Field
        type="text"
        as={Input}
        name={label}
        id={label}
        placeholder={placeholder || ""}
        {...rest}
      >
      </Field>
      <ErrorMessage name={label} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
    </>
  )
}

export function LongTextField(props: any) {
  const { question, description, label, placeholder, isRequired, ...rest } = props;
  return (
    <>
      <HStack>
        <h3>{question}</h3>
        {isRequired && <Text color="red.400">*</Text>}
      </HStack>      {description && <Text color="gray.600">{description}</Text>}
      <Field
        type="text"
        as={Textarea}
        name={label}
        id={label}
        placeholder={placeholder || ""}
        {...rest}
      >
      </Field>
      <ErrorMessage name={label} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
    </>
  )
}

export function SelectField(props: any) {
  const { question, description, label, options, isRequired } = props;
  console.log('props', label, props);

  return (
    <>
      <HStack>
        <h3>{question}</h3>
        {isRequired && <Text color="red.400">*</Text>}
      </HStack>
      {description && <Text color="gray.600">{description}</Text>}
      <Field
        id={label}
        as={Select}
        name={label}
      >
        <option value="" >Choose...</option>
        {options.map((optn: any, idx: number) => <option key={idx} value={optn.value} label={optn.label || optn.value} />)}
      </Field>
      <ErrorMessage name={label} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
    </>
  )
}

export function Multiselect(props: any) {
  const { question, description, label, options, isRequired } = props;
  return (
    <>
      <HStack>
        <h3>{question}</h3>
        {isRequired && <Text color="red.400">*</Text>}
      </HStack>
      {description && <Text color="gray.600">{description}</Text>}
      <CheckboxGroup>
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          {options.map((optn: any, idx: number) => <Checkbox key={idx} value={optn.value} name={label}>{optn.label || optn.value}</Checkbox>)}
        </Stack>
      </CheckboxGroup>
      <ErrorMessage name={label} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
    </>
  )
}

export function Radio(props: any) {
  const { question, description, label, options, isRequired } = props;

  return (
    <>
      <HStack>
        <h3>{question}</h3>
        {isRequired && <Text color="red.400">*</Text>}
      </HStack>
      {description && <Text color="gray.600">{description}</Text>}
      <Field as={RadioGroup} id={label}>
        <Stack spacing={[1, 5]} direction={'column'}>
          {options.map((optn: any, idx: number) => <ChakraRadio key={idx} value={optn.value} name={label}>{optn.label || optn.value}</ChakraRadio>)}
        </Stack>
      </Field>
      <ErrorMessage name={label} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
    </>
  )
}

export function SubmitButton(props: any) {
  const { isSubmitting } = useFormikContext();

  return (
    <Button type="submit" {...props} disabled={isSubmitting}>Submit</Button>
  )
}