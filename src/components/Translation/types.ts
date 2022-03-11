import {MeasureHandler} from '@types';

export interface TextProps {
  value: string;
}

export interface BlankElementProps {
  getMeasure: MeasureHandler;
  itemWidth?: number;
}

export interface TranslationProps {
  text: string;
  renderItem(item: string, index: number): void;
}
