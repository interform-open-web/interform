import { CloseIcon } from "@chakra-ui/icons"
import { HStack, Input, List, propNames, } from "@chakra-ui/react"
import { useState } from "react";

export const AddOption = () => {
  const [options, setOptions] = useState<any[]>([]);
  const [currentOption, setCurrentOption] = useState<string>('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    setCurrentOption(e.target.elements.option.value);
    console.log(e.target.elements.option.value)
  };


  return (<>
    <List spacing={3} width="100%">
      {options.map((option: any, idx: number) =>
        <HStack key={idx} width="100%">
          <Input placeholder={option.label} />
          <CloseIcon />
        </HStack>)}
      <HStack width="100%">
        <form
          onSubmit={onSubmit}
        >
          <HStack width="100%">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Add option"
              id='option'
              name='option'
              width="100%"
              defaultValue={currentOption}
            />
            <CloseIcon />
          </HStack>
        </form>
      </HStack>
    </List>
  </>)
}