import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  AsyncStorage,
} from 'react-native';
import {user_profile} from '../config/config';
import Size from '../res/Size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // userName : 'NGUYEN PHUC BAO CHAU',
      email: 'Chau@MediaList.com',
    };
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.avtView}>
          <Image
            style={styles.avatar}
            source={require('../res/images/ic_avatar.png')}
          />
          <Text
            style={{
              fontSize: Size.h34,
              fontWeight: '600',
              marginTop: '5%',
              color: '#335271',
            }}>
            {user_profile.fullName}
          </Text>
          <Text style={{fontSize: Size.h28, color: '#335271'}}>
            {user_profile.email}
          </Text>
          <Image
            style={styles.stripe}
            source={require('../res/images/stripe.png')}
          />
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.chucNangView}>
            <TouchableOpacity
              style={styles.Item}
              onPress={() => this.props.navigation.navigate('InfoApp')}>
              <Image
                style={{width: 25, height: 25, marginVertical: '5%'}}
                source={require('../res/images/info.png')}
              />
              <Text
                style={{
                  fontSize: Size.h32,
                  marginLeft: '5%',
                  marginVertical: '5%',
                  color: '#335271',
                }}>
                Thông tin ứng dụng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ItemEnd}>
              {/* <Image
                style={{width: 25, height: 25, marginVertical: '5%'}}
                source={require('../res/images/logout.png')}
              /> */}
              <MaterialIcons name="logout" color="#335271" size={Size.h52} />
              <Text
                style={{
                  fontSize: Size.h32,
                  marginLeft: '5%',
                  marginVertical: '5%',
                  color: '#335271',
                }}
                onPress={() => {
                  this.Logout();
                }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  Logout() {
    user_profile.token = '';
    user_profile.fullName = '';
    user_profile.email = '';
    this.forgetUser();
    this.props.navigation.navigate('Login');
  }

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('passWord');
    } catch (error) {
      console.log(error);
    }
  };
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
  },
  avtView: {
    borderRadius: 100,
    alignItems: 'center',
  },
  avatar: {
    resizeMode: 'contain',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  stripe: {
    resizeMode: 'contain',
    height: undefined,
    aspectRatio: 70,
    marginVertical: '4%',
  },
  chucNangView: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  Item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  ItemEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll: {},
});
