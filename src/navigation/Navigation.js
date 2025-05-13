/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Pressable} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Course from '../screens/Course';
import Task from '../screens/Task';
import Home from '../screens/Home';
import WhatsNew from '../screens/WhatsNew';
import Profile from '../screens/Profile';
import {
  CourseInactive,
  CourseActive,
  TaskInactive,
  TaskActive,
  HomeInactive,
  HomeActive,
  WhatsNewInactive,
  WhatsNewActive,
  ProfileInactive,
  ProfileActive,
} from '../assets/svg.js';
import {Colors} from '../utils/Colors.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    backBehavior="initialRoute"
    screenOptions={{
      tabBarButton: props => (
        <Pressable {...props} android_ripple={{color: 'transparent'}} />
      ),
      tabBarStyle: styles.tabBarStyle,
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarBackground: () => (
        <View style={styles.blurViewContainer}>
          <BlurView
            style={styles.blurView}
            blurType="dark"
            blurAmount={2}
            overlayColor="transparent"
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00000020', '#00000020']}
            style={styles.linearGradient}
          />
        </View>
      ),
    }}>
    <Tab.Screen
      name="Course"
      component={Course}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.iconContainer}>
            {focused ? (
              <CourseActive width={22} height={22} />
            ) : (
              <CourseInactive width={22} height={22} />
            )}
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="Task"
      component={Task}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.iconContainer}>
            {focused ? (
              <TaskActive width={22} height={22} />
            ) : (
              <TaskInactive width={22} height={22} />
            )}
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.iconContainer}>
            {focused ? (
              <View style={styles.activeFabBg}>
                <HomeActive width={22} height={22} />
              </View>
            ) : (
              <View style={styles.inactiveFabBg}>
                <HomeInactive width={22} height={22} />
              </View>
            )}
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="WhatsNew"
      component={WhatsNew}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.iconContainer}>
            {focused ? (
              <WhatsNewActive width={22} height={22} />
            ) : (
              <WhatsNewInactive width={22} height={22} />
            )}
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.iconContainer}>
            {focused ? (
              <ProfileActive width={22} height={22} />
            ) : (
              <ProfileInactive width={22} height={22} />
            )}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const TabNav = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainTabs" component={MainTabNavigator} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    height: 50,
    borderRadius: 70,
    marginHorizontal: 30,
    backgroundColor: '#00000050',
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.1,
    borderBottomWidth: 0.02,
    borderColor: 'rgba(255, 255, 255,0.5)',
  },
  blurViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 70,
    overflow: 'hidden',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // Ensures it covers the full area
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject, // Applies gradient over blur for smooth effect
  },
  activeFabBg: {
    width: 65,
    height: 65,
    borderRadius: 65,
    backgroundColor: Colors.primaryred,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    top: 5,
    borderColor: '#ffffff60',
    borderWidth: 0.4,
  },
  inactiveFabBg: {
    width: 65,
    height: 65,
    borderRadius: 65,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    top: 5,
    borderColor: '#ffffff60',
    borderWidth: 0.4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    zIndex: 2, // Ensures icons are above the blurred background
  },
});

export default TabNav;
