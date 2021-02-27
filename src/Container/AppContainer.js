import React from 'react';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createDrawerNavigator} from 'react-navigation-drawer';

import InfoApp from '../Components/InfoApp';

import LoginContainer from './LoginContainer';
import getCourseContainer from './getCourseContainer';
import EditCourseContainer from './EditCourseContainer';
import AddCourseContainer from './AddCourseContainer';
import getClassContainer from './getClassContainer';
import AddClassContainer from './AddClassContainer';
import EditClassContainer from './EditClassContainer';

import icon_menu from '../res/images/ic_menu.png';
import SlideMenu from '../Components/SlideMenu';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.openDrawer()}
        />
      </View>
    );
  }
}

const LuuQLKHHeader = {
  QLKH: {
    screen: getCourseContainer,
    navigationOptions: ({navigation}) => ({
      title: 'Quản lý khóa học', // Tên hiện trên header
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: () => (
        // Nút bên phải
        <TouchableOpacity
          style={{marginRight: 20}}
          onPress={() => {
            navigation.navigate('AddCourse');
          }}>
          <Text style={{fontSize: 35, color: 'grey'}}>+</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        // Nút bên trái
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => {
            navigation.navigate('AddCourse');
            // navigation.openDrawer();
          }}>
          <Image source={icon_menu} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      ),
      headerTintColor: 'darkslategrey', // Màu chữ trên header
    }),
  },
};

const MenuDrawer = createDrawerNavigator(
  {
    Item: {
      screen: getCourseContainer,
    },
  },
  {
    contentComponent: SlideMenu,
    drawerWidth: '80%',
  },
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
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
        title: 'Thêm khóa học',
        headerTitleStyle: {alignSelf: 'center'},
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
        title: 'Sửa khóa học',
        headerTitleStyle: {alignSelf: 'center'},
      },
    },
    GetClass: {
      screen: getClassContainer,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddClass: {
      screen: AddClassContainer,
      navigationOptions: {
        headerShown: false,
        title: 'Thêm buổi học',
        headerTitleStyle: {alignSelf: 'center'},
      },
    },
    EditClass: {
      screen: EditClassContainer,
      navigationOptions: {
        headerShown: false,
        title: 'Sửa buổi học',
        headerTitleStyle: {alignSelf: 'center'},
      },
    },
    InfoApp: {
      screen: InfoApp,
      navigationOptions: {
        headerShown: false,
        title: 'Thông tin ứng dụng',
        headerTitleStyle: {alignSelf: 'center'},
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);
