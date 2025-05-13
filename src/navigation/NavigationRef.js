// RootNavigation.js

import * as React from 'react';

import {StackActions} from '@react-navigation/native';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function replace(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.dispatch(StackActions.replace(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted

    navigationRef.current.goBack();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// Can use navigation in any component as below

// import * as NavigationRef from './navigationRef';

// NavigationRef.navigate('Categories', { category: 'All' })
