import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl,
  TouchableHighlightBase,
  TouchableOpacityBase,
  Touchable,
  SafeAreaView,
} from 'react-native';
import { conDate } from './config';
import Size from '../res/Size';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu from './ItemMenu';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';

const formatDate = (value) => {
  let day = new Date(value);
  let stringDay =
    day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear() + '';
  return stringDay;
};

export default class QLKhoaHocComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 1,
      data: [],
      dayStart: new Date(),
      dayEnd: new Date(),
      key: 1,
      refreshing: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getCourseAction();
    });

    this.props.getCourseAction();
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.getCourseAction();
    }

    if (prevProps.data !== this.props.data) {
      if (this.props.data.type === 'GET_COURSE_ERROR') {
        Alert.alert('Lỗi rồi!!!', this.props.data.message);
      } else if (this.props.data.type === 'GET_COURSE_SUCCESS') {
        this.setState({ data: this.props.data.data });
      }
    }

    if (prevProps.dataDelete !== this.props.dataDelete) {
      if (this.props.dataDelete === 'DELETE_COURSE_ERROR') {
        Alert.alert('Lỗi rồi!!!', this.props.dataDelete.message);
      } else if (this.props.dataDelete !== null) {
        if (this.props.dataDelete.type === 'DELETE_COURSE_SUCCESS') {
          this.props.getCourseAction();

          ToastAndroid.showWithGravity(
            'Xóa thành công!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.containerx}>
        <SafeAreaView style={{ margin: 0 }} />
        <View style={styles.ContainerMenu}>
          <TouchableOpacity
            style={styles.Menu}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../res/images/ic_menu.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Quản Lý Khóa Học</Text>
          <TouchableOpacity
            style={styles.Plus}
            onPress={() => this.props.navigation.navigate('AddCourse')}>
            <Image
              source={require('../res/images/ic_plus.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.props.getCourseAction();
                }}
              />
            }
            data={this.state.data}
            style={{ marginVertical: '2%' }}
            renderItem={(item) => this.renderItem(item)}
            extraData={this.state}
            keyExtractor={(item) => {
              return item.course_id;
            }}
          />
        </ScrollView>
      </View>
    );
  }

  renderItem = ({ item }) => {
    let id = item.course_id;
    let title = item.courseName;
    let giangVien = item.trainer;
    let quanLy = item.created_by;
    let thoiGianBatDau = item.startedDate;
    let thoiGianKetThuc = item.endedDate;
    let toaNha = item.buildingName;
    let Phong = item.roomName;
    let buildingId = item.buildingId;
    let roomId = item.roomId;

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            console.log('id : ', id),
              this.props.navigation.navigate('GetClass', {
                id: id.trim(),
                title: title,
                thoiGianBatDau: thoiGianBatDau,
                thoiGianKetThuc: thoiGianKetThuc,
              });
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: Size.h38,
                fontWeight: 'bold',
                color: 'darkslategrey',
                flex: 15,
                marginRight: '10%',
              }}>
              {title}
            </Text>
            <Menu
              style={{
                flex: 1,
                padding: '1%',
              }}
              delete={() => {
                this.props.deleteCourseAction(id.trim());
              }}
              edit={() => {
                this.props.navigation.navigate('EditCourse', {
                  id: id.trim(),
                  title: title,
                  giangVien: giangVien,
                  quanLy: quanLy,
                  thoiGianBatDau: thoiGianBatDau,
                  thoiGianKetThuc: thoiGianKetThuc,
                  toaNha: toaNha,
                  Phong: Phong,
                  buildingId: buildingId,
                  roomId: roomId,
                });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'user-tie'}
              color="#FFD237"
              size={Size.h40}
              style={[styles.icon]}
            />

            <Text style={{ fontSize: Size.h32 }}>Giảng viên: </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#0000FF',
                fontSize: Size.h32,
                flex: 1,
                marginRight: '15%',
                fontWeight: 'bold',
              }}>
              {giangVien}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '4%',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'address-card'}
              color="#412F4E"
              size={Size.h40}
              style={[styles.icon]}
            />

            <Text style={{ fontSize: Size.h32 }}>Cán bộ quản lý: </Text>
            <Text
              style={{
                color: '#f27228',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {quanLy}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '4%',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'calendar-check'}
              color="#42C8FB"
              size={Size.h40}
              style={styles.icon}
            />
            <Text style={{ fontSize: Size.h32 }}>Thời gian: </Text>
            <Text
              style={{
                color: 'darkslategrey',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {formatDate(thoiGianBatDau)}
            </Text>
            <Text style={{ fontSize: Size.h32, fontWeight: 'bold' }}> - </Text>
            <Text
              style={{
                color: 'darkslategrey',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {formatDate(thoiGianKetThuc)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '4%',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'building'}
              color="#0090D7"
              size={Size.h40}
              style={styles.icon}
            />
            <Text style={{ fontSize: Size.h32 }}>Tòa nhà: </Text>
            <Text
              style={{
                color: 'darkslategrey',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {toaNha}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '4%',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name={'chalkboard-teacher'}
              color="#FF9226"
              size={Size.h40}
              style={styles.icon}
            />
            <Text style={{ fontSize: Size.h32 }}>Phòng: </Text>
            <Text
              style={{
                color: 'darkslategrey',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {Phong}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  containerx: {
    flex: 1,
    backgroundColor: '#f4f7fc',
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: '5%',
    marginVertical: '2%',
    marginHorizontal: '4%',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  icon: {
    padding: 5,
    paddingRight: 20,
  },
  ContainerMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: 'grey',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    // borderWidth: 2
  },
  Image: {
    width: 5,
    height: 5,
    padding: 10,
  },
  Menu: {
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    alignItems: 'flex-start',
  },
  Plus: {
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    alignItems: 'flex-end',
  },
  Title: {
    flex: 1,
    textAlign: 'center',
    fontSize: Size.h40,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: '4%',
  },
});
