import {DarkModetheme} from '../utils/Colors';

export const CONSTANT = {
  LIGHTMODE: 'LIGHTMODE',
  DARKMODE: 'DARKMODE',
  set_theme: 'SET_THEME',
  fetch_error: 'FETCH_HOME_ERROR',

  //
  restore_data: 'RESTORE_HOME_DATA',
};

export const initialState = {
  isLoading: true,
  isFetching: true,
  darkMode: true, // Set dark mode as default
  AppThemeMode: 'dark', // Set default theme mode to dark
  AppThemeColors: DarkModetheme.colors, // Set default colors to dark mode
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case CONSTANT.restore_data:
      return {
        ...state,
        ...action.state,
        isLoading: false,
      };
    case CONSTANT.LIGHTMODE:
      return {...state, darkMode: false};
    case CONSTANT.DARKMODE:
      return {...state, darkMode: true};
    case CONSTANT.set_theme:
      return {
        ...state,
        AppThemeColors: action.themecolors,
        AppThemeMode: action.thememode,
      };
    default:
      return state;
  }
};
