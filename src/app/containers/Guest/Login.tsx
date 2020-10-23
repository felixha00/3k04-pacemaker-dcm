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
    Link
  } from "@chakra-ui/core";
  import React, { Component } from "react";
  
  interface Props {
      history: any;
  }
  
  export class Login extends Component<Props> {
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
          <Heading mb={6}>Login</Heading>
            <form
              id="login"
              onSubmit={(e) => {
                try {
                  e.preventDefault();
                 
                  let users: Array<any> = JSON.parse(
                    localStorage.getItem("pacemaker-users") || "[]"
                  );
                  
                  let user = users.find(user => user.username === this.state.username)
                  
                  if (user){
                    if (user.password === this.state.password) {
                        localStorage.setItem("user", JSON.stringify(user))
                        this.props.history.push('/dashboard')
                    } else {
                       this.setState({ error: "Incorrect Password" });
                    }


                  } 
                  else this.setState({ error: "Account not found" });
                 
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
                Login
              </Button>
             
            </form>
            <Link href="/new-user">Create new user</Link>
          </Stack>
        </Center>
      );
    }
  }
  
  //export default CreateUser
  