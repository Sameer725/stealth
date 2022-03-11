import React from 'react';

import {Button, Text} from '../base';
import {ContinueButtonProps} from './types';

export const ContinueButton = ({
  buttonColor = 'white3',
  disabled,
  label = 'Continue',
  onPress,
  textColor = 'white1',
}: ContinueButtonProps) => {
  return (
    <Button
      left="8%"
      right="8%"
      top="50%"
      position="absolute"
      alignItems="center"
      backgroundColor={buttonColor}
      borderRadius="round"
      disabled={disabled}
      marginHorizontal="s4"
      onPress={onPress}
      padding="s4"
      zIndex="top">
      <Text color={textColor} fontWeight="bold" textTransform="uppercase">
        {label}
      </Text>
    </Button>
  );
};
