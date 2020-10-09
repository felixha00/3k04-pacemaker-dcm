/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "styles/global-styles";

import { HomePage } from "./containers/HomePage/Loadable";
import { NotFoundPage } from "./components/NotFoundPage/Loadable";
import { ChakraProvider, Container, Box } from "@chakra-ui/core";
import { customTheme } from "utils/configs";
import { Login } from "./containers/Guest/Login";
import { CreateUser } from "./containers/Guest/CreateUser";
import Dashboard from "./containers/User/Dashboard";

export function App() {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Switch>
          <Container centerContent>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new-user" component={CreateUser} />
          </Container>
        </Switch>
        <Switch>
          <Box p={6}>
            <Route exact path="/dashboard" component={Dashboard}></Route>
          </Box>
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
