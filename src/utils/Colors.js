import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const Colors = {
  black: '#000',
  white: '#fff',
  finishblue: '#1679d3',
  primaryred: '#DF0E11',
  secondred: '#D72323',
  lightblue: '#4B2EDD',
  lightwhite: '#D1D0D0',

  getColors: mode =>
    mode === 'dark' ? DarkModetheme.colors : LightModetheme.colors,
};

export const DarkModetheme = {
  ...DarkTheme,
  roundness: 5,
  colors: {
    ...DarkTheme.colors,
    header1: '#ffffff',
    header2: '#D1D0D0',
  },
};

export const LightModetheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    header1: '#2C2C2C',
    header2: '#303030',
  },
};
