import { Center, Container, Text, VStack } from "@chakra-ui/react";
import { LoadedForm } from "@components/LoadedForm";
import { NextPage } from "next"
import FormData from '../../mocks/basic-form.json';

const Censor: NextPage = () => {
  const formStructure = FormData;
  const dateCreated = new Date(formStructure.timestamp);

  return (
    <Container paddingTop={20} paddingBottom={10} maxWidth={'1500px'}>
      <Center>
        <VStack gap={2}>
          <h1>{formStructure.name}</h1>
          <Text size="12px">Created: {dateCreated.toLocaleDateString()} {dateCreated.toLocaleTimeString()}</Text>
          <LoadedForm formSchema={formStructure.formOptions} />
        </VStack>
      </Center>
    </Container>
  )
}

export default Censor
