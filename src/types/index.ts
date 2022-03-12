import {ColorProps} from '@shopify/restyle';
import {Theme} from '@theme';

export interface MeasureType {
  height: number;
  pageX: number;
  pageY: number;
  width: number;
  x: number;
  y: number;
}

export type MeasureHandler = (measure: MeasureType) => void;

export type Color = ColorProps<Theme>['color'];

interface StatusType {
  bottomSheetColor: Color;
  buttonColors: Color;
  buttonLabel: string;
  buttonLabelColor: Color;
  showBottomSheet: boolean;
  selectionTextColor: Color;
  selectionButtonColor: Color;
}

export interface AnswerStateType {
  correct: StatusType;
  error: StatusType;
  idle: StatusType;
  selected: StatusType;
}

interface Data {
  sentence: string;
  word: string;
  options?: string[];
}

export interface TranslationData {
  translate: Data;
  translation: Data;
}
