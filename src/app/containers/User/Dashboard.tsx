import {
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Button,
  Input
} from '@chakra-ui/core';
import React, { Component } from 'react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';
import Parameters from './Parameters';
import Pacemaker from './Pacemaker';
import { subscribeToTimer, writeData } from 'utils/socket.io/socketIoAPI';
import dayjs from "dayjs";

interface Props {
  history: any;
}
interface State {}

class Dashboard extends Component<Props, State> {
  constructor(props) {
    super(props);
    /*
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
*/
  }
  state = {
    name: '',
    timestamp: '',
  };

  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({ name: user.username });
    
    subscribeToTimer((err, timestamp) => {
      try {
        this.setState({ 
          timestamp 
        })
      } catch (error) {
        console.log(err)
      }
    }
    );
  };

  handleClick(val) {
    writeData(val, (flag) => {
      return console.log(flag)
    })
  }


  render() {
    return (
      <>
        <Stack isInline alignItems="center">
          <Stack>
            <Text fontSize="xs">3K04 Pacemaker | v.1.0.1 | McMaster University </Text>
            <Text>{dayjs(this.state.timestamp).format('D MMM YYYY h:mm:ssA')}</Text>
            <Heading>Dashboard</Heading>
            <Heading fontSize="md">Name: {this.state.name}</Heading>
          </Stack>
          <Flex flexGrow={1} />
          <Button
            colorScheme="purple"
            fontSize="sm"
            onClick={() => this.props.history.push('/')}
          >
            Log Out
          </Button>
          <IconButton aria-label="menu" icon={<Text>⚙️</Text>}></IconButton>
        </Stack>
        <Tabs mt={3} variant="enclosed-colored" colorScheme="purple">
          <TabList>
            {tabData.map((tab, index) => (
              <Tab key={index}>{tab.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabData.map((tab, index) => (
              <TabPanel p={0} mt={6} key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Button key={3} onClick={() => this.handleClick(21)}>
              Send 0x15
        </Button>
        <Button key={3} onClick={() => this.handleClick(2)}>
              Send 0x2
        </Button>
        <Button key={3} onClick={() => this.handleClick(3)}>
              Send 0x3
        </Button>
      </>
    );
  }
}

export default Dashboard;

const tabData = [
  {
    label: 'Pacemaker',
    content: <Pacemaker />,
  },
  {
    label: 'Parameters',
    content: <Parameters />,
  },
];
