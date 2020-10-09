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
  Heading
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

  render() {
    return (
      <Center h="100vh">
        <Stack>
        <Heading mb={6}>Register</Heading>
          <form
            id="login"
            onSubmit={(e) => {
              try {
                e.preventDefault();
                let users: Array<Object> = JSON.parse(
                  localStorage.getItem("pacemaker-users") || "[]"
                );

                if (users.length < 11) {
                  users.push({
                    username: this.state.username,
                    password: this.state.password,
                  });
                  localStorage.setItem(
                    "pacemaker-users",
                    JSON.stringify(users)
                  );
                  this.state.error = "";
                  this.props.history.push('/login')
                } else {
                  this.setState({ error: "Max 10 Users" });
                }
              } catch (error) {}
            }}
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
        </Stack>
      </Center>
    );
  }
}

//export default CreateUser