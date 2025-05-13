import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Nav from './navigation/Navigation';
import {isReadyRef, navigationRef} from './navigation/NavigationRef';
import {ThemeProvider} from './store/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
            <Nav />
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
