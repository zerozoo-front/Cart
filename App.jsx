import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './store/store';
import { Nav } from './step_2/Nav';

const GlobalStyle = createGlobalStyle`
*{
box-sizing:border-box;
list-style: none;
margin:0;
padding:0;
font-family: Arial, Helvetica, sans-serif;
}
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Nav />
      </Provider>
    </ThemeProvider>
  );
}
