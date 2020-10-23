import { Divider, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/core";
import React, { Component } from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import Parameters from "./Parameters";
import Pacemaker from "./Pacemaker";
import { subscribeToTimer } from "utils/socket.io/socketIoAPI";


interface Props {}
interface State {}

class Dashboard extends Component<Props, State> {
  constructor(props){
    super(props)
    /*
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
*/
  }
  state = {
    name: "",
    timestamp: "",
  };


  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ name: user.username });
    /*
    subscribeToTimer((err, timestamp) => {
      try {
        this.setState({ 
          timestamp 
        })
      } catch (error) {
        console.log(err)
      }
    }
    
   
    
    
    );*/
  };

  render() {
    return (
      <>
      <Stack isInline alignItems="center">

     
        <Stack>
          <Text>{this.state.timestamp}</Text>
          <Heading>Dashboard</Heading>
          <Heading fontSize="md">Name: {this.state.name}</Heading>
          
        </Stack>
        <Flex flexGrow={1}/>
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
      </>
    );
  }
}

export default Dashboard;

const tabData = [
    {
      label: 'Pacemaker',
      content: <Pacemaker/>
    },
    {
        label: 'Parameters',
        content: <Parameters/>
    },
    
]