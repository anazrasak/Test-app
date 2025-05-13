/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, StyleSheet, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../store/ThemeContext';

const Background = ({children}) => {
  const {AppThemeMode} = useContext(ThemeContext);

  const bgImage =
    AppThemeMode === 'dark'
      ? require('../assets/PNG/bg_img.png')
      : require('../assets/PNG/bg_light.png');

  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
});

export default Background;
