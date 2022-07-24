import { Center, Container, Text, VStack } from "@chakra-ui/react";
import { LoadedForm } from "@components/LoadedForm";
import { NextPage } from "next"
import FashionFormData from '../../mocks/fashion-form.json';

const FashionForm: NextPage = () => {
  const formStructure = FashionFormData;
  const dateCreated = new Date(formStructure.timestamp);

  return (
    <Container paddingTop={10} paddingBottom={10} maxWidth={'1500px'}>
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

export default FashionForm
