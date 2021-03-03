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
import {conDate} from './config';
import Size from '../res/Size';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu from './ItemMenu';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';

const formatDate = (value) => {
  let day = new Date(value);
  let stringDate =
    checkLength(day.getDate()) +
    '/' +
    checkLength(day.getMonth() + 1) +
    '/' +
    day.getFullYear() +
    '';
  // console.log('dateeeeeeeeeee: ' + stringDate);
  return stringDate;
};

const checkLength = (text1) => {
  // console.log('checkLength chay');
  // console.log('text ' + text1);
  let text = text1 + '';
  // console.log('length ' + text.length);
  if (text.length === 1) {
    return '0' + text;
  } else {
    return text;
  }
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
      buildingSelected: '',
      roomSelected: '',
      dataBuilding: [],
      dataRoom: '',
      Location: '',
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getBuildingRoomAction();
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
        this.setState({data: this.props.data.data});
      }
    }

    if (this.props.dataBuilding.type === 'GET_BUILDING_ROOM_SUCCESS') {
      console.log('GET_BUILDING_ROOM_SUCCESS');
      // console.log(this.props.dataBuilding);
      // this.setState({dataBuilding: []});
      // this.setState({dataBuilding: this.props.dataBuilding.data});
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

  getLocation(buidingID, roomID) {
    try {
      if (this.props.dataBuilding.data.length !== undefined) {
        for (let i = 0; i < this.props.dataBuilding.data.length; i++) {
          if (this.props.dataBuilding.data[i]._id === buidingID) {
            for (
              let j = 0;
              j < this.props.dataBuilding.data[i].room.length;
              j++
            ) {
              if (this.props.dataBuilding.data[i].room[j]._id === roomID) {
                const aaa = this.props.dataBuilding.data[i].room[j].location;
                return ' - ' + aaa;
              }
            }
          } else {
            return '';
          }
        }
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }

  render() {
    return (
      <View style={styles.containerx}>
        <SafeAreaView style={{margin: 0}} />
        <View style={styles.ContainerMenu}>
          <TouchableOpacity
            style={styles.Menu}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../res/images/ic_menu.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>QUẢN LÝ KHÓA HỌC</Text>
          <TouchableOpacity
            style={styles.Plus}
            onPress={() => this.props.navigation.navigate('AddCourse')}>
            {/* <Image
              source={require('../res/images/ic_plus.png')}
              style={styles.Image}
            /> */}
            <FontAwesome5
              name={'plus'}
              color="#d4d5d8"
              size={Size.h42}
              // style={[styles.Image]}
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
            style={{marginVertical: '2%'}}
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

  renderItem = ({item}) => {
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
              // alignItems: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: Size.h36,
                fontWeight: 'bold',
                color: '#315673',
                flex: 15,
                marginRight: '10%',
              }}>
              {title}
            </Text>
            <Menu
              style={{
                flex: 2,
                // padding: '1%',
                // paddingHorizontal: '1%',
                // backgroundColor: 'blue',
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
              marginTop: '2%',
              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <FontAwesome5 name={'user-tie'} color="#FFD237" size={Size.h40} />
            </View>

            <View
              style={{
                flex: 11,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: Size.h32, color: '#315673'}}>
                Giảng viên:{' '}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: '#0a8dc3',
                  fontSize: Size.h32,
                  flex: 1,
                  // marginLeft: 5,
                  marginRight: '15%',
                  fontWeight: 'bold',
                }}>
                {giangVien}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: '1%',
              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <FontAwesome5
                name={'address-card'}
                color="#412F4E"
                size={Size.h40}
                // style={[styles.icon]}
              />
            </View>

            <View
              style={{
                flex: 11,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: Size.h32, color: '#315673'}}>
                Cán bộ quản lý:{' '}
              </Text>
              <Text
                style={{
                  color: '#f19440',
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                  // marginLeft: 5,
                  marginRight: '15%',
                  fontWeight: 'bold',
                }}>
                {quanLy}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: '4%',
              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <FontAwesome5
                name={'calendar-check'}
                color="#42C8FB"
                size={Size.h40}
                // style={styles.icon}
              />
            </View>
            <View
              style={{
                flex: 11,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: Size.h32, color: '#315673'}}>
                Thời gian:{' '}
              </Text>
              <Text
                style={{
                  color: '#315673',
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                }}>
                {formatDate(thoiGianBatDau)}
              </Text>
              <Text
                style={{
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                  color: '#315673',
                }}>
                {' '}
                -{' '}
              </Text>
              <Text
                style={{
                  color: '#315673',
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                }}>
                {formatDate(thoiGianKetThuc)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: '4%',
              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <FontAwesome5
                name={'building'}
                color="#0090D7"
                size={Size.h40}
                // style={styles.icon}
              />
            </View>
            <View
              style={{
                flex: 11,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: Size.h32, color: '#315673'}}>
                Tòa nhà:{' '}
              </Text>
              <Text
                style={{
                  color: '#315673',
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                }}>
                {toaNha}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // marginTop: '4%',
              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <FontAwesome5
                name={'chalkboard-teacher'}
                color="#FF9226"
                size={Size.h40}
                // style={styles.icon}
              />
            </View>
            <View
              style={{
                flex: 11,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: Size.h32, color: '#315673'}}>
                Phòng:{' '}
              </Text>
              <Text
                style={{
                  color: '#315673',
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                }}>
                {Phong}
              </Text>
              <Text
                style={{
                  color: '#315673',
                  fontSize: Size.h32,
                  fontWeight: 'bold',
                }}>
                {this.getLocation(buildingId, roomId)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  containerx: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: '3%',
    marginVertical: '2%',
    marginHorizontal: '4%',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  icon: {
    padding: 5,
    // paddingRight: 20,
    flex: 1,
    // backgroundColor: 'red',
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  Image: {
    width: 5,
    height: 5,
    padding: 10,
    // backgroundColor: 'red',
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
    fontSize: Size.h38,
    fontWeight: 'bold',
    color: '#345173',
    paddingVertical: '4%',
  },
});
