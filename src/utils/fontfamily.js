import React from 'react';
import {Platform, Text as TEXT} from 'react-native';
import {Colors} from '../utils/Colors';

const getFontSize = size => {
  switch (size) {
    case 'xs':
      return 8;
    case 'sm':
      return 10;
    case 'md':
      return 12;
    case 'lg':
      return 14;
    case 'xl':
      return 16;
    case 'xxl':
      return 18;
    case 'xxxl':
      return 22;
    case '4xl':
      return 24;
    case '5xl':
      return 26;
    case '6xl':
      return 28;
    default:
      return 12;
  }
};

const getFontFamily = family => {
  switch (family) {
    case 'h1':
      return Platform.OS === 'android'
        ? 'Poppins-ExtraBold'
        : 'Poppins-ExtraBold';
    case 'h2':
      return Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins-Bold';
    case 'h3':
      return Platform.OS === 'android'
        ? 'Poppins-SemiBold'
        : 'Poppins-SemiBold';
    case 'h4':
      return Platform.OS === 'android' ? 'Poppins-Medium' : 'Poppins-Medium';
    case 'h5':
      return Platform.OS === 'android' ? 'Poppins-Regular' : 'Poppins-Regular';
    case 'h6':
      return Platform.OS === 'android' ? 'Poppins-Light' : 'Poppins-Light';
    default:
      return Platform.OS === 'android' ? 'Poppins-Medium' : 'Poppins-Medium';
  }
};

const getFontColor = color => {
  switch (color) {
    case 'black':
      return Colors.black;
    case 'white':
      return Colors.white;
    case 'lightwhite':
      return Colors.lightwhite;
    default:
      return Colors.black;
  }
};

export const Text = ({
  size,
  style,
  textAlign,
  family,
  numberOfLines = null,
  children,
  color,
}) => (
  <TEXT
    style={[
      {
        fontFamily: getFontFamily(family),
        fontSize: getFontSize(size),
        color: getFontColor(color),
      },
      style,
    ]}
    textAlign={textAlign}
    numberOfLines={numberOfLines}>
    {children}
  </TEXT>
);
