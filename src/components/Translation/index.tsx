import React from 'react';

import {useGetMeasure} from '@utils';

import {Box, Text} from '../base';
import {BlankElementProps, TextProps, TranslationProps} from './types';

export const BlankElement = ({getMeasure, itemWidth}: BlankElementProps) => {
  const {animatedRef, layoutHandler} = useGetMeasure(getMeasure);

  return (
    <Box
      ref={animatedRef}
      borderBottomColor="white1"
      borderBottomWidth={2}
      onLayout={layoutHandler}
      width={itemWidth ?? 100}
    />
  );
};

export const NormalText = ({value}: TextProps) => {
  return (
    <Box
      alignSelf="flex-start"
      borderBottomColor="white1"
      borderBottomWidth={1}
      borderStyle="dotted"
      marginHorizontal="s2">
      <Text color="white1" fontSize={16} textAlign="center">
        {value}
      </Text>
    </Box>
  );
};

export const Translation = ({text = '', renderItem}: TranslationProps) => {
  return (
    <Box flexDirection="row" marginVertical="s5">
      {text.split(' ').map(renderItem)}
    </Box>
  );
};
