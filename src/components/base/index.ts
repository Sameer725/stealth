import {
  all,
  AllProps,
  createBox,
  createRestyleComponent,
  createText,
} from '@shopify/restyle';
import {Theme} from '@theme';
import {
  View as RNView,
  Text as RNText,
  Pressable,
  PressableProps,
} from 'react-native';

import Animated from 'react-native-reanimated';

export const Box = createBox<Theme>(Animated.createAnimatedComponent(RNView));
export const Button = createRestyleComponent<
  PressableProps & AllProps<Theme>,
  Theme
>(all, Animated.createAnimatedComponent(Pressable));
export const Text = createText<Theme>(Animated.createAnimatedComponent(RNText));
