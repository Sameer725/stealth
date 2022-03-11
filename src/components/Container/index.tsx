import React from 'react';
import {StatusBar} from 'react-native';

import {useTheme} from '@theme';

import {Box} from '../base';

export const Container: React.FC = ({children}) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background1} />
      <Box flex={1} backgroundColor="background1">
        {children}
      </Box>
    </>
  );
};
