import React, {useReducer, createContext, useMemo, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialState, Reducer, CONSTANT} from './ThemeReducer';
import {DarkModetheme, LightModetheme} from '../utils/Colors';

export const ThemeContext = createContext();

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error fetching data:', e);
    return null;
  }
};

const ThemeProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const themeContext = useMemo(
    () => ({
      SetThemeColors: async (color, mode) => {
        dispatch({
          type: CONSTANT.set_theme,
          themecolors: color,
          thememode: mode,
        });

        // Store the theme mode in AsyncStorage
        await storeData('@themeMode', mode);
      },
    }),
    [],
  );

  useEffect(() => {
    // Restore theme mode from AsyncStorage, defaulting to Dark Mode
    const initializeTheme = async () => {
      const storedMode = await getData('@themeMode');
      const defaultMode = storedMode || 'dark'; // Default to dark mode

      dispatch({
        type: CONSTANT.set_theme,
        themecolors:
          defaultMode === 'dark' ? DarkModetheme.colors : LightModetheme.colors,
        thememode: defaultMode,
      });
    };

    initializeTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{...themeContext, ...state}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider};
