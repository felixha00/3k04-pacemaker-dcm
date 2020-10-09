import { Box, Button, Heading, Text, Stack, Center } from '@chakra-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage(props) {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Box>

        <Center h="100vh">

       
        <Stack>
        <Heading mb={6}>3K04 Pacemaker</Heading>
        <Button onClick={() => props.history.push('/login')}>Login</Button>
        <Button onClick={() => props.history.push('/new-user')}>Create User</Button>
        
        </Stack>
        </Center>
      </Box>
    </>
  );
}
