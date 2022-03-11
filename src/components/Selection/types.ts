import {Color, MeasureHandler, MeasureType} from '@types';
import {ViewStyle} from 'react-native';

export interface SelectionProps {
  data: string[];
  renderItem(item: string, index: number): void;
}

export interface TranslateLayout {
  item: {label: string};
  layout: {x: number; y: number};
}

export interface SelectionItemProps {
  buttonColor: Color;
  disabled?: boolean;
  getMeasure: MeasureHandler;
  index: number;
  label: string;
  onItemPress(answer: string, index: number): void;
  style?: ViewStyle;
  textColor: Color;
  translateLayout: TranslateLayout;
}

export interface PlaceholderProps {
  measures: MeasureType[];
  index: number;
}
