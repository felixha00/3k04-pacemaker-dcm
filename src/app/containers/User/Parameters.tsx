import {
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Box,
  SimpleGrid,
  Button,
} from '@chakra-ui/core';
import { inputParamOpts, parameterOpts } from 'utils/parameters';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';

import React, { Component } from 'react'
import { connect } from 'react-redux'

interface Props {
  
}
interface State {
  
}

export class Parameters extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
      <Heading fontSize="xl">Current Parameters</Heading>
      <Stack mt={6} spacing={6}>
        <form>
          <SimpleGrid mt={3} columns={[1, 2, 2, 4, 5]} spacing={3}>
            {Object.keys(parameterOpts).map(key => {
              return (
                <>
                  <Box>
                    <Text
                      textTransform="uppercase"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {key}
                    </Text>
                    <Select variant="filled">
                      {parameterOpts[key].map(option => (
                        <option value={option}>{option}</option>
                      ))}
                    </Select>
                  </Box>
                </>
              );
            })}

            {Object.keys(inputParamOpts).map(key => {
              let input = inputParamOpts[key];
              return (
                <>
                  <Box>
                    <Text
                      textTransform="uppercase"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {key}
                    </Text>
                    <NumberInput
                      variant="filled"
                      step={input.step}
                      defaultValue={input.min}
                      min={input.min}
                      max={input.max}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text fontSize="xs">{input.unit}</Text>
                  </Box>
                </>
              );
            })}
          </SimpleGrid>
          <Button mt={6} colorScheme="purple">
            Save
          </Button>
        </form>
      </Stack>
    </>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Parameters)


