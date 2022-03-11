import {ColorProps} from '@shopify/restyle';

import {Theme} from '@theme';

export interface ContinueButtonProps {
  buttonColor?: ColorProps<Theme>['color'];
  disabled?: boolean;
  label?: string;
  onPress?(): void;
  textColor?: ColorProps<Theme>['color'];
}
