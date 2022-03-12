import React, {useCallback, useMemo} from 'react';

import {Box, Button, Text} from '../base';
import {PlaceholderProps, SelectionItemProps, SelectionProps} from './types';
import {useGetMeasure} from '@utils';
import {usePlaceholderStyle, useSelectionStyle} from './styles';

export const PlaceHolderComponent = ({measures, index}: PlaceholderProps) => {
  const style = usePlaceholderStyle(index, measures);

  return (
    <Box
      backgroundColor="white3"
      borderRadius="round"
      width="33.33%"
      padding="s6"
      position="absolute"
      opacity={0}
      style={style}
    />
  );
};

export const SelectionItem = ({
  index,
  label,
  onItemPress,
  getMeasure,
  translateLayout,
  buttonColor,
  textColor,
  disabled,
}: SelectionItemProps) => {
  const {animatedRef, layoutHandler} = useGetMeasure(getMeasure);
  const isSelected = useMemo(
    () => label === translateLayout.item.label,
    [translateLayout, label],
  );
  const translateStyle = useSelectionStyle(label, translateLayout, isSelected);

  const onPress = useCallback(() => {
    onItemPress(isSelected ? '' : label, index);
  }, [index, label, onItemPress, isSelected]);

  return (
    <Button
      alignItems="center"
      backgroundColor={buttonColor}
      borderRadius="round"
      disabled={disabled}
      justifyContent="center"
      margin="s3"
      onLayout={layoutHandler}
      onPress={onPress}
      padding="s4"
      ref={animatedRef}
      style={[translateStyle]}
      width="33.33%"
      zIndex="top">
      <Text color={textColor} fontSize={18} fontWeight="bold">
        {label}
      </Text>
    </Button>
  );
};

export const Selection = ({data = [], renderItem}: SelectionProps) => {
  return (
    <Box
      flexDirection="row"
      flexWrap="wrap"
      marginTop="s10"
      justifyContent="center">
      {data.map(renderItem)}
    </Box>
  );
};
