import React, {useLayoutEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Box, Text} from '../base';
import {BottomSheetProps} from './types';

const BOTTOM_SHEET_HEIGHT = 200;
export const BottomSheet = ({color, label, display}: BottomSheetProps) => {
  const progress = useSharedValue(0);

  useLayoutEffect(() => {
    const setProgress = (value: number) =>
      (progress.value = withTiming(value, {duration: 300}));
    if (display) {
      setProgress(1);
    } else {
      setProgress(0);
    }
  }, [display, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: (1 - progress.value) * BOTTOM_SHEET_HEIGHT,
    };
  }, []);

  return (
    <Box
      backgroundColor={color}
      borderTopEndRadius="round"
      borderTopStartRadius="round"
      height={BOTTOM_SHEET_HEIGHT}
      paddingHorizontal="s10"
      paddingVertical="s7"
      zIndex="hidden"
      style={animatedStyle}>
      <Text color="white1" fontSize={18} fontWeight="bold">
        {label}
      </Text>
    </Box>
  );
};
