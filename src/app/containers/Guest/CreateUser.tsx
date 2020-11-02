import {
  Box,
  Center,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  FormErrorMessage,
  FormControl,
  Text,
  Heading,
  Link,
  Code
} from "@chakra-ui/core";
import React, { Component } from "react";

interface Props {
    history: any;
}

export class CreateUser extends Component<Props> {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleChange(event) {
    let target = event.target;
    this.setState({ [target.name]: event.target.value });
  }

  createUser = (e, username, pass) => {
   
      try {
        e.preventDefault();
        let users: Array<Object> = JSON.parse(
          localStorage.getItem("pacemaker-users") || "[]"
        );

        if (users.length < 10) {
          users.push({
            username: username,
            password: pass,
          });
          localStorage.setItem(
            "pacemaker-users",
            JSON.stringify(users)
          );
          this.state.error = "";
         
          //this.props.history.push('/login')
        } else {
          this.setState({ error: "Max 10 Users" });
        }
      } catch (error) {}
    
  }

  render() {
    let registeredUsers: Array<Object> = JSON.parse(
      localStorage.getItem("pacemaker-users") || "[]"
    );

    return (
      <Center h="100vh">
        <Stack>
        <Heading mb={6}>Register</Heading>
          <form
            id="login"


            onSubmit={(e) => this.createUser(e, this.state.username, this.state.password)}


          >
            <Box>
              <FormLabel>Username</FormLabel>

              <Input
                name="username"
                variant="filled"
                value={this.state.username}
                onChange={(e) => this.handleChange(e)}
              ></Input>
            </Box>
            <Box>
              <FormLabel>Password</FormLabel>
          
              <Input
                name="password"
                variant="filled"
                value={this.state.password}
                onChange={(e) => this.handleChange(e)}
              ></Input>
            </Box>
            <Box>
            <Text color="red.500" mt={3}>{this.state.error}</Text>
            </Box>
            <Button mt={6} colorScheme="purple" type="submit">
              Register
            </Button>
          </form>
          <Link href="/login">Login instead</Link>
              
          {
            <Code p={3} colorScheme="purple">{
              localStorage.getItem("pacemaker-users")}</Code>
          }
        </Stack>
      </Center>
    );
  }
}

//export default CreateUser
