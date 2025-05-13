import {useContext} from 'react';
import {ThemeContext} from '../store/ThemeContext';
import {DarkModetheme, LightModetheme} from '../utils/Colors';

const useThemeColors = () => {
  const {AppThemeMode} = useContext(ThemeContext);
  return AppThemeMode === 'dark' ? DarkModetheme.colors : LightModetheme.colors;
};

export default useThemeColors;
