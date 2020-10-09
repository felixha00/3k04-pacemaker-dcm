import { Divider, Heading, Stack } from "@chakra-ui/core";
import React, { Component } from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import Parameters from "./Parameters";
interface Props {}
interface State {}

class Dashboard extends Component<Props, State> {
  state = {
    name: "",
  };

  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    this.setState({ name: user.username });
  };

  render() {
    return (
      <>
        <Stack>
          <Heading>Dashboard</Heading>
          <Heading fontSize="md">Name: {this.state.name}</Heading>
          
        </Stack>

        <Tabs mt={3} variant="enclosed-colored" isFitted colorScheme="purple">
          <TabList>
            {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
            ))}
            <Tab>One</Tab>
            <Tab>Two</Tab>
            
          </TabList>
          <TabPanels>
            {tabData.map((tab, index) => (
            <TabPanel p={4} key={index}>
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
        label: 'Parameters',
        content: <Parameters/>
    },
    
]