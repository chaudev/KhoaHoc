import React from 'react';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import InfoApp from '../components/InfoApp';
import LoginContainer from './login/LoginContainer';
import GetCourseContainer from './course/GetCourseContainer';
import EditCourseContainer from './course/EditCourseContainer';
import AddCourseContainer from './course/AddCourseContainer';
import GetClassContainer from './class/GetClassContainer';
import AddClassContainer from './class/AddClassContainer';
import EditClassContainer from './class/EditClassContainer';
import SlideMenu from '../components/SlideMenu';

const MenuDrawer = createDrawerNavigator(
  {
    Item: {
      screen: GetCourseContainer,
    },
  },
  {
    contentComponent: SlideMenu,
    drawerWidth: '80%',
  },
);

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddCourse: {
      screen: AddCourseContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    MenuDrawer: {
      screen: MenuDrawer,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditCourse: {
      screen: EditCourseContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    GetClass: {
      screen: GetClassContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddClass: {
      screen: AddClassContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditClass: {
      screen: EditClassContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    InfoApp: {
      screen: InfoApp,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);
