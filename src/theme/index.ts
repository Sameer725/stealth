import {createTheme, useTheme as useRSTheme} from '@shopify/restyle';

export const colors = {
  background1: '#75DAFE',
  background2: '#3A6C82',
  error1: '#FE7787',
  error2: '#FF928D',
  success: '#01E0E7',
  transparent: 'rgba(0,0,0,0.1)',
  white1: '#FEFDFF',
  white2: '#F6FAFD',
  white3: 'rgba(255,255,255,0.1)',
};

export const spacing = {
  px: 1,
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 28,
  s8: 32,
  s9: 36,
  s10: 40,
  s30p: '30%',
};

export const borderRadii = {
  round: 30,
  curve: 12,
};

const zIndices = {
  hidden: -1,
  top: 1,
};

export const theme = createTheme({
  colors,
  spacing,
  breakpoints: {small: {height: 100, width: 100}},
  borderRadii,
  zIndices,
});

export type Theme = typeof theme;
export const useTheme = () => useRSTheme<Theme>();
