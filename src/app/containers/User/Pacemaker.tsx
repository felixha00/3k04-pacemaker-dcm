import { Stack, Box, Text, Select, Button, Heading, Divider } from '@chakra-ui/core';
import React, { Component } from 'react';
import { connectCOMPort, getCOMPorts } from 'utils/socket.io/socketIoAPI';
import { connect } from 'react-redux';
import { Atrium } from './Graphs/Atrium';
import { defaults } from 'react-chartjs-2';
import { Ventricle } from './Graphs/Ventricle';
 
// Disable animating charts by default.
defaults.global.defaultFontFamily = 'Inter';
interface Props {
  pacemaker: any;
}
interface State {}

const PacemakerStatus = props => {
  return (
    <>
      <Box bg="purple.500" w="fit-content" p={6} color="white" rounded="md">

        {console.log(props)}
        <Heading fontSize="xl" w="fit-content">
          Pacemaker Status
        </Heading>
        <Stack mt={3} fontSize="sm">
          <Box>
            <Text>
              Connected: {props.connected ? '✔️' : '❌'}
            </Text>
            <Text color="purple.100" fontSize="xs">
              {props.msg}
            </Text>
          </Box>
        </Stack>
        </Box>
    </>
  );
};

class Pacemaker extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  state = {
    port: '',
    availablePorts: [],
    connected: false,
    msg: '',
  };

  handleCOMChange = e => {
    var index = e.nativeEvent.target.selectedIndex;
    if (index === 0) {
      return this.setState({ port: '' });
    }
    this.setState({ port: e.nativeEvent.target[index].text });
  };

  handleCOMConnect = () => {
    connectCOMPort((res, msg) => {
      this.setState({ msg: msg, connected: res });
    }, this.state.port);
  };

  componentDidMount = () => {
    getCOMPorts(ports => this.setState({ availablePorts: ports }));
  };

  render() {
    return (
      <>
      <Stack spacing={6}>
        <PacemakerStatus {...this.props} {...this.state} />
     
        <Box d="inline-flex">
          <Button
            mr={3}
            variant="outline"
            fontSize="sm"
            onClick={() =>
              getCOMPorts(ports => this.setState({ availablePorts: ports }))
            }
          >
            🔄
          </Button>
          <Select
            variant="filled"
            placeholder="Select COM Port"
            onChange={e => this.handleCOMChange(e)}
          >
            {this.state.availablePorts.map(port => (
              <option value={port}>{port}</option>
            ))}
          </Select>
          <Button
            onClick={() => this.handleCOMConnect()}
            ml={3}
            fontSize="sm"
            colorScheme="purple"
            isDisabled={this.state.port === ''}
          >
            Connect
          </Button>
        </Box>
        

      </Stack>
      <Atrium/>
      <Ventricle/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  pacemaker: state.pacemaker,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Pacemaker);
