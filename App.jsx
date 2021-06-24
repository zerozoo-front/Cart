import React from 'react';
import { Dropdown } from './step_1/hooks/Dropdown';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { deliveryTypes } from './data';
import theme from './theme';
import Counter from './step_1/hooks/Counter';
import { Provider } from 'react-redux';
import store from './store/store';

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
        <Dropdown input={deliveryTypes} />

        <Counter />
      </Provider>
    </ThemeProvider>
  );
}
