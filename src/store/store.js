import {configureStore} from '@reduxjs/toolkit';
import apiReducer from './ApiReducer';

export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});
