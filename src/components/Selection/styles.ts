import {MeasureType} from '@types';
import {useLayoutEffect, useMemo, useRef} from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TranslateLayout} from './types';

// translate style for placeholder
export const usePlaceholderStyle = (index: number, measures: MeasureType[]) => {
  const progress = useSharedValue(0);
  const prevIndex = useRef<number>(0);

  useLayoutEffect(() => {
    if (index !== -1) {
      progress.value = withTiming(index, {duration: 600});
      prevIndex.current = index;
    }
  }, [index, progress]);

  const style = useAnimatedStyle(() => {
    if (measures.length) {
      const nextIndex = index === -1 ? prevIndex.current : index;
      const inputRange = [prevIndex.current, nextIndex];
      const translateXOutputRange = inputRange.map(i => measures[i].pageX);
      const translateYOutputRange = inputRange.map(
        i => measures[i].pageY - measures[0].pageY + 12,
      );

      const clamp = Extrapolate.CLAMP;
      const left = interpolate(
        progress.value,
        inputRange,
        translateXOutputRange,
        clamp,
      );

      const top = interpolate(
        progress.value,
        inputRange,
        translateYOutputRange,
        clamp,
      );

      return {opacity: 1, top, left};
    }

    return {};
  }, [measures.length, index, prevIndex]);

  return style;
};

// translate style for selection item
export const useSelectionStyle = (
  label: string,
  translateLayout: TranslateLayout,
  isSelected: boolean,
) => {
  const translationProgress = useSharedValue(0);
  const prevLayout = useRef(translateLayout.layout);

  const layout = useMemo(() => {
    return isSelected ? translateLayout.layout : prevLayout.current;
  }, [translateLayout, isSelected, prevLayout]);

  useLayoutEffect(() => {
    const setTranslate = (value: number) =>
      (translationProgress.value = withTiming(value, {duration: 1200}));
    if (isSelected) {
      setTranslate(1);
      prevLayout.current = translateLayout.layout;
    } else {
      setTranslate(0);
    }
  }, [translationProgress, isSelected, prevLayout, translateLayout]);

  const translateStyle = useAnimatedStyle(() => {
    const inputRange = [0, 1];
    const clamp = Extrapolate.CLAMP;

    const translateXOutputRange = [0, layout.x];
    const translateYOutputRange = [0, layout.y];

    const translateX = interpolate(
      translationProgress.value,
      inputRange,
      translateXOutputRange,
      clamp,
    );

    const translateY = interpolate(
      translationProgress.value,
      inputRange,
      translateYOutputRange,
      clamp,
    );

    return {transform: [{translateX}, {translateY}]};
  }, [layout]);

  return translateStyle;
};
