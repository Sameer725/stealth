import {MeasureHandler} from '@types';
import {View} from 'react-native';

export const getLayoutMeasure = (
  ref: React.RefObject<View>,
  measureHandler: MeasureHandler,
) => {
  ref.current?.measure?.((x, y, width, height, pageX, pageY) =>
    measureHandler?.({x, y, width, height, pageX, pageY}),
  );
};
