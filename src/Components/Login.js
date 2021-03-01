import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  AsyncStorage,
} from 'react-native';
import Logo from '../res/images/ic_logo.png';
import DauGach from '../res/images/stripe.png';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAcc from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {user_profile} from './config';
// import {} from '@react-native-async-storage/async-storage';
import Size from '../res/Size';
import {SafeAreaView} from 'react-navigation';
import Sizes from '../res/Size';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      passWord: '',
      sttShowPass: true,
      show: 'eye-slash',
      thongBaoLoi: '',
      data: [],
      check: 'circle',
      checked: 'check-circle',
      sttCheck: false,
      title: 'Login',
    };
  }

  Login() {
    this.props.loginAction(this.state.userName, this.state.passWord);
  }

  async componentDidMount() {
    const userName = await this.getRememberedUser();
    this.setState({
      userName: userName || '',
    });
    const passWord = await this.getRememberedPass();
    this.setState({
      passWord: passWord || '',
    });

    if (this.state.userName !== '' && this.state.passWord !== '') {
      this.setState({sttCheck: true});
      this.checkRemember();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({data: this.props.data});
      if (this.props.data.resultCode === -1) {
        this.setState({thongBaoLoi: this.props.data.message});
        Alert.alert(
          'Đăng nhập thất bại',
          '\nNhập sai tài khoản hoặc mật khẩu \n\nVui lòng kiểm tra và nhập lại!',
        );
      } else if (this.props.data.resultCode === 1) {
        user_profile.token = this.props.data.data.token;
        user_profile.fullName = this.props.data.data.fullName;
        user_profile.email = this.props.data.data.email;
        this.props.navigation.replace('MenuDrawer');
      }
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexGrow: 1,
          backgroundColor: '#f4f7fc',
        }}>
        <SafeAreaView />
        <View style={style.container}>
          {/* LOGO */}
          <View style={style.logoContainer}>
            <Image
              source={require('../res/images/ic_logo.png')}
              style={{
                resizeMode: 'contain',
                height: undefined,
                aspectRatio: 6,
                marginTop: '10%',
              }}
            />
            {/* Dòng chữ */}
            <Text
              style={{
                fontSize: Size.h42,
                fontWeight: 'bold',
                color: '#335271',
                marginTop: '5%',
              }}>
              FIS INSIGHT PORTAL
            </Text>
            {/* 3 dau gach */}
            <Image
              source={require('../res/images/stripe.png')}
              style={{
                resizeMode: 'contain',
                height: undefined,
                aspectRatio: 70,
                marginVertical: '4%',
              }}
            />
            {/* Chữ đăng nhập hệ thống */}
            <Text
              style={{
                fontSize: Size.h38,
                fontWeight: 'bold',
                color: '#ff9f24',
                marginBottom: '4%',
              }}>
              ĐĂNG NHẬP HỆ THỐNG
            </Text>
          </View>
          <View style={style.inputContainer}>
            {/* Khung nhập tài khoản*/}
            <View style={style.textInputContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '3%',
                  // backgroundColor: 'red',
                }}>
                <FontAwesome5
                  style={style.icon}
                  name={'user'}
                  solid
                  color="#b2bcc6"
                  size={Sizes.h34}
                />
              </View>

              <TextInput
                value={this.state.userName}
                placeholder="Tài khoản"
                placeholderTextColor="#335271"
                onChangeText={(text) => this.setState({userName: text})}
                style={[style.textInput]}
              />
              {/* </View> */}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <FontAwesome5
                  style={style.showHidePassword}
                  name={this.state.show}
                  solid
                  color="transparent"
                  size={Sizes.h34}
                />
              </View>
            </View>

            {/* Khung nhập mật khẩu */}
            <View style={style.textInputContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '3%',
                }}>
                <FontAwesome5
                  style={style.icon}
                  name={'lock'}
                  color="#b2bcc6"
                  size={Sizes.h34}
                />
              </View>

              <TextInput
                keyboardType="default"
                secureTextEntry={this.state.sttShowPass}
                placeholder="Mật khẩu"
                placeholderTextColor="#335271"
                onChangeText={(text) => this.setState({passWord: text})}
                style={[style.textInput]}
                value={this.state.passWord}
              />
              {/* </View> */}

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // marginRight: '2%'
                }}>
                <FontAwesome5
                  onPress={() => {
                    this.ClickShowPass();
                  }}
                  style={style.showHidePassword}
                  name={this.state.show}
                  solid
                  color="#b2bcc6"
                  size={Sizes.h34}
                />
              </View>
            </View>
          </View>
          <View>
            {/* Nút nhớ mật khẩu */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '4%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.ClickCheckBox(this.state.sttCheck);
                }}
                style={{
                  marginRight: '2%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name={this.checkRememberIcon()}
                  color="#ff9335"
                  size={Size.h40}
                />
                <Text
                  style={{
                    fontSize: Size.h30,
                    color: '#ff9335',
                    fontStyle: 'italic',
                    marginLeft: '4%',
                  }}>
                  Ghi nhớ đăng nhập
                </Text>
              </TouchableOpacity>
            </View>

            {/* Nút đăng nhập */}
            <TouchableOpacity
              style={style.button}
              onPress={() => this.checkRemember()}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: Size.h32,
                  paddingVertical: 12,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  // backgroundColor: 'red',
                }}>
                ĐĂNG NHẬP
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingTop: '4%',
            justifyContent: 'flex-start',
            flex: 1.5,
          }}>
          <Image
            style={{
              resizeMode: 'contain',
              width: '60%',
              height: undefined,
              aspectRatio: 1.5,
            }}
            source={require('../res/images/swipe.png')}
          />
        </View>

        {/* Dòng chữ Copyright */}
        <View style={style.Footer}>
          <Text style={style.copyRight}>
            Copyright © 2019, FPT Information System
          </Text>
        </View>
        {/* Màn hình loading */}
        {this.props.fetching && (
          <ActivityIndicator
            size="large"
            color="#FF0000"
            style={style.Indicator}
          />
        )}
      </ScrollView>
    );
  }

  checkRememberIcon() {
    if (this.state.sttCheck === false) {
      return this.state.check;
    } else return this.state.checked;
  }

  ClickShowPass() {
    if (this.state.show == 'eye-slash') {
      this.setState({show: 'eye'});
      this.setState({sttShowPass: false});
    } else {
      this.setState({show: 'eye-slash'});
      this.setState({sttShowPass: true});
    }
  }

  ClickCheckBox(stt) {
    if (stt == false) {
      this.setState({check: 'check-circle'});
      this.setState({sttCheck: true});
    } else {
      this.setState({check: 'circle'});
      this.setState({sttCheck: false});
    }
  }

  checkRemember() {
    if (this.state.userName !== '' && this.state.passWord !== '') {
      if (this.state.sttCheck === true) {
        this.rememberUser();
      } else {
        this.forgetUser();
      }
      this.Login();
    } else {
      Alert.alert('Đăng nhập thất bại', 'Vui lòng nhập đầy đủ thông tin!');
    }
  }

  rememberUser = async () => {
    try {
      await AsyncStorage.setItem('userName', this.state.userName);
      await AsyncStorage.setItem('passWord', this.state.passWord);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu tài khoản');
    }
  };

  forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('passWord');
    } catch (error) {
      console.log(error);
    }
  };

  getRememberedUser = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      if (userName !== null) {
        // We have username!!
        return userName;
      }
    } catch (error) {
      // Alert.alert('Lỗi', 'Không thể lấy tài khoản');
    }
  };

  getRememberedPass = async () => {
    try {
      const passWord = await AsyncStorage.getItem('passWord');
      if (passWord !== null) {
        // We have username!!
        return passWord;
      }
    } catch (error) {
      // Alert.alert('Lỗi', 'Không thể lấy tài khoản');
    }
  };
}

// StyleSheet
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '80%',
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  textInput: {
    flex: 8,
    color: '#335271',
    textAlign: 'center',
    paddingVertical: 10,
    // paddingHorizontal: 80,
    fontSize: Size.h36,
    // backgroundColor: 'green',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff9335',
    borderRadius: 5,
    // paddingVertical: 1,
  },
  copyRight: {
    color: '#adb3bc',
    fontSize: Size.h26,
    marginBottom: '2%',
    // backgroundColor: 'red',
    textAlign: 'center',
  },
  failText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
  },
  Indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.8,
    backgroundColor: '#e8e9ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 2,
    marginTop: '5%',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  Footer: {
    justifyContent: 'center',
    position: 'relative',
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: '4%',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#e6eaed',
  },
  icon: {
    position: 'absolute',
    // backgroundColor: 'transparent',
    // backgroundColor: 'blue',
    marginLeft: '3%',
  },
  showHidePassword: {
    position: 'relative',
    // backgroundColor: 'red',
    marginRight: '3%',
  },
});
