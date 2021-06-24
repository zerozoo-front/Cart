import React from 'react';
import { Dropdown } from './step_1/hooks/Dropdown';
import { ThemeProvider } from 'styled-components';
import { DropdownInput } from './step_1/hooks/DropDownInput';
import { createGlobalStyle } from 'styled-components';
import { deliveryTypes } from './data';
import theme from './theme';

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
      <div>TesT</div>
      <GlobalStyle />
      <Dropdown input={deliveryTypes} />
    </ThemeProvider>
  );
}
