import {useAnimatedRef} from 'react-native-reanimated';
import {useCallback} from 'react';
import {View} from 'react-native';

import {getLayoutMeasure} from './getLayoutMeasure';
import {MeasureHandler} from '@types';

export const useGetMeasure = (getMeasure: MeasureHandler) => {
  const animatedRef = useAnimatedRef<View>();

  const layoutHandler = useCallback(() => {
    getLayoutMeasure(animatedRef, getMeasure);
  }, [animatedRef, getMeasure]);

  return {animatedRef, layoutHandler};
};
