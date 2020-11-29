import {
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Box,
  SimpleGrid,
  Button,
  Checkbox,
} from '@chakra-ui/core';
import {
  activityThresholdOpts,
  inputParamOpts,
  parameterOpts,
  programmableParams,
  y_pacingMode,
  y_pacingState,
} from 'utils/parameters';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toBytesInt32 } from 'utils/numberFunctions';
import { setParams } from 'store/actions/pacemakerActions';

interface Props {
  pacemaker: any
}
interface State {}

export class Parameters extends Component<Props, State> {
  state = {
    p_pacingMode: 'VVI',
    p_pacingState: 'PERMANENT',
    p_lowrateInterval: 1000,
    p_vPaceAmp: 3500,
    p_vPaceWidth: 0.4,
    p_VRP: 320,
    maximumSensorRate: 120,
    activityThreshold: 'MED',
    reaction_time: 0,
    recovery_time: 0,
    response_factor: 8,
    lower_rate_limit: 0,
    atrial_amplitude: 0,
    atrial_pulse_width: 0,
    ventricular_amplitude: 0,
    ventricular_pulse_width: 0,
    ventricular_refractory_period: 0,
    atrial_refractory_period: 0,
  };

  
  componentDidMount() {

    this.setState({
      ...this.props.pacemaker.params,
      reaction_time: 10 + ((16 - this.state.response_factor) * 8) / 3,
      recovery_time: 120 + (((16 - this.state.response_factor) * 14) / 15) * 60,
    });
  }

  onSelectChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    //@ts-ignore
    this.props.setParams(this.state)
  }

  onResponseFactorChange(n) {
    this.setState({
      response_factor: n,
      reaction_time: 10 + ((16 - n) * 8) / 3,
      recovery_time: 120 + (((16 - n) * 14) / 15) * 60,
    });
  }

  render() {
   
    let buf = Buffer.allocUnsafe(4);
    var str = JSON.stringify(this.state, undefined, 4);
    return (
      <>  

        <Heading fontSize="xl">Current Parameters</Heading>
        <Stack mt={6} spacing={6}>
        <pre>{str}</pre>
          <form onSubmit={e => this.onSubmit(e)}>
            <SimpleGrid mt={3} columns={[1, 2, 2, 4, 5]} spacing={3}>
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  p_pacingMode
                </Text>
                <Select
                  onChange={e => this.onSelectChange(e)}
                  value={this.state.p_pacingMode}
                  variant="filled"
                  name="p_pacingMode"
                  id="p_pacingMode"
                >
                  {y_pacingMode.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  p_pacingState
                </Text>
                <Select
                  onChange={e => this.onSelectChange(e)}
                  value={this.state.p_pacingState}
                  variant="filled"
                  name="p_pacingState"
                  id="p_pacingState"
                >
                  {y_pacingState.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  Activity Threshold
                </Text>
                <Select
                  onChange={e => this.onSelectChange(e)}
                  value={this.state.activityThreshold}
                  variant="filled"
                  name="activityThreshold"
                  id="activityThreshold"
                >
                  {activityThresholdOpts.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
              </Box>

              {Object.keys(programmableParams).map(key => {
                let input = programmableParams[key];
                return (
                  <>
                    <Box>
                      <Text fontSize="sm" fontWeight="bold">
                        {key}
                      </Text>
                      <NumberInput
                        variant="filled"
                        value={this.state[key]}
                        onChange={num => this.setState({ [key]: num })}
                        min={input.min}
                        max={input.max}
                      >
                        <NumberInputField />
                      </NumberInput>
                      <Text fontSize="xs">
                        {input.min} - {input.max} | {input.unit}
                      </Text>
                    </Box>
                  </>
                );
              })}
            </SimpleGrid>

            <SimpleGrid mt={6} columns={[1, 2, 2, 4, 5]} spacing={3}>
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
                        onChange={num => this.setState({ [key]: num })}
                        value={this.state[key]}
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
            <SimpleGrid mt={6} columns={[1, 2, 2, 4, 5]} spacing={3}>
              <Box>
                <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
                  Response Factor
                </Text>
                <NumberInput
                  variant="filled"
                  step={1}
                  onChange={num => this.onResponseFactorChange(num)}
                  value={this.state.response_factor}
                  defaultValue={8}
                  min={1}
                  max={16}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize="xs"></Text>
              </Box>

              <Box>
                <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
                  Reaction Time
                </Text>

                <Text fontSize="xl">{this.state.reaction_time} s</Text>
                <Text>{Math.fround(this.state.reaction_time)}</Text>
              </Box>

              <Box>
                <Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
                  Recovery Time
                </Text>

                <Text fontSize="xl">{this.state.recovery_time} s</Text>
                <Text>{Math.fround(this.state.recovery_time)}</Text>
              </Box>
            </SimpleGrid>

            <Button type="submit" mt={6} colorScheme="purple">
              Save
            </Button>
          </form>
        </Stack>
       
      </>
    );
  }
}

const mapStateToProps = state => ({
  pacemaker: state.pacemaker
});

const mapDispatchToProps = {
  setParams,
};

export default connect(mapStateToProps, mapDispatchToProps)(Parameters);
