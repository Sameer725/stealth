import React from 'react';

import {Box, Text} from '../base';
import {CommandProps} from './types';

export const Command = ({command}: CommandProps) => {
  return (
    <Box marginVertical="s5">
      <Text color="white2" fontSize={12} textAlign="center">
        {command}
      </Text>
    </Box>
  );
};
