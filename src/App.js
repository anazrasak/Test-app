import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Nav from './navigation/Navigation';
import {isReadyRef, navigationRef} from './navigation/NavigationRef';
import {ThemeProvider} from './store/ThemeContext';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
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
      </Provider>
    </ThemeProvider>
  );
};

export default App;
