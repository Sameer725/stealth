import React from 'react';

import {ThemeProvider} from '@shopify/restyle';

import {Container} from '@components';
import {PlayScreen} from '@pages';
import {theme} from '@theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PlayScreen />
      </Container>
    </ThemeProvider>
  );
};

export default App;
