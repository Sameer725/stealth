import React, {useCallback} from 'react';

import {Box, Text} from '../base';
import {HighlightedTextProps, TranslateProps} from './types';

const NO_WIDTH_SPACE = '​ ';

const HighlightedText = ({value}: HighlightedTextProps) => {
  return (
    <Text>
      {NO_WIDTH_SPACE}
      <Text
        color="white1"
        fontSize={20}
        fontWeight="bold"
        textAlign="center"
        textDecorationLine="underline">
        {value}
      </Text>
      {NO_WIDTH_SPACE}
    </Text>
  );
};

const NormalText = ({value}: HighlightedTextProps) => {
  return (
    <Text color="white1" fontSize={16} marginHorizontal="s1" textAlign="center">
      {value}
    </Text>
  );
};

export const Translate = ({
  text = '',
  textToTranslate = '',
}: TranslateProps) => {
  const renderText = useCallback(
    value => {
      if (textToTranslate === value) {
        return <HighlightedText key={value} value={value} />;
      }

      return <NormalText key={value} value={value} />;
    },
    [textToTranslate],
  );

  return (
    <Box alignItems="center" flexDirection="row" marginVertical="s5">
      {text.split(' ').map(renderText)}
    </Box>
  );
};
