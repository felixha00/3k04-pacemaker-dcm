import { Heading, Input, Select, Stack, Text, Box, SimpleGrid } from '@chakra-ui/core'
import React from 'react'
import { inputParamOpts, parameterOpts} from 'utils/parameters'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/core"


interface Props {
    
}

const Parameters = (props: Props) => {


    return (
        <>
        <Heading fontSize="xl">Current Parameters</Heading>
        <Stack mt={6} spacing={6}>
            
            {
                Object.keys(parameterOpts).map(key => {
                    return (
                        <>
                        <Box>

                       
                        <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">{key}</Text>
                        <Select variant="filled">
                          {
                            parameterOpts[key].map( option => (
                                <option value={option}>
                                    {option}
                                </option>  
                            ))
                                
                          }  
                          
                        </Select>

                      
                        </Box>
                        </>
                    )
                   
                })

                
            }
            <SimpleGrid columns={[1,2,2,4,5]} spacing={3}>
            {
                Object.keys(inputParamOpts).map(key => {
                    let input = inputParamOpts[key]
                    return (
                        <>
                        <Box>

                       
                        <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">{key}</Text>
                        <NumberInput variant="filled" step={input.step} defaultValue={input.min} min={input.min} max={input.max}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
                    <Text fontSize="xs">{input.unit}</Text>
                        </Box>
                        </>
                    )
                   
                })

                
            }
            </SimpleGrid>
            
        </Stack>
        </>
    )
}

export default Parameters
