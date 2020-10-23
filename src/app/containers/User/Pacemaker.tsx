import { Stack, Box, Text, Select, Button, Heading } from '@chakra-ui/core';
import React, { Component } from 'react';
import { connectCOMPort, getCOMPorts } from 'utils/socket.io/socketIoAPI';
import { connect } from 'react-redux';

interface Props {
  pacemaker: any;
}
interface State {}

const PacemakerStatus = props => {
  return (
    <>
      <Box p={3} border={"1px solid black" }rounded="md">
        <Heading
        fontSize="xl"
          w="fit-content"
        
        >
          Pacemaker Status
        </Heading>
        <Stack mt={1} fontSize="sm">
            
          <Text>Connected: {props.pacemaker.connected ? '✔' : '❌'}</Text>
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
  };

  handleCOMChange = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    if (index === 0) {
        return this.setState({port: ''})
    }
    this.setState({port:e.nativeEvent.target[index].text})
  }

  handleCOMConnect = () => {
    connectCOMPort(null, this.state.port)
  }


  componentDidMount = () => {
    getCOMPorts(ports => this.setState({ availablePorts: ports }));
  };

  render() {
    return (
      <Stack>
          {console.log(this.state)}
        <PacemakerStatus {...this.props}/>

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
          <Select variant="filled" placeholder="Select COM Port" onChange={(e) => (
              this.handleCOMChange(e)
          )}>
            {this.state.availablePorts.map(port => (
              <option value={port}>{port}</option>
            ))}
          </Select>
        <Button onClick={() => this.handleCOMConnect()} ml={3} fontSize="sm" colorScheme="purple" isDisabled={this.state.port === ''}>Connect</Button>    
        </Box>


      </Stack>
    );
  }
}

const mapStateToProps = state => ({
  pacemaker: state.pacemaker,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Pacemaker);
