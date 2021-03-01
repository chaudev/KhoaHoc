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
  SafeAreaView,
} from 'react-native';
import Size from '../res/Size';
import Menu from './ItemMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const formatDate = (value) => {
  let day = new Date(value);
  let stringDay =
    day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear() + '';
  return stringDay;
};

export default class ClassManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 1,
      data: [],
      dayStart: new Date(),
      dayEnd: new Date(),
      key: 1,
      refreshing: false,
      courseId: '',
      TenKH: '',
      thoiGianBatDau: new Date(),
      thoiGianKetThuc: new Date(),
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      const courseId = this.props.navigation.getParam(
        'id',
        'some default value',
      );
      this.setState({courseId: courseId});

      const thoiGianBatDau = this.props.navigation.getParam(
        'thoiGianBatDau',
        'some default value',
      );
      this.setState({thoiGianBatDau: thoiGianBatDau});

      const thoiGianKetThuc = this.props.navigation.getParam(
        'thoiGianKetThuc',
        'some default value',
      );
      this.setState({thoiGianKetThuc: thoiGianKetThuc});

      this.props.getClassAction(courseId);
    });

    const courseId = this.props.navigation.getParam('id', 'some default value');
    this.setState({courseId: courseId});

    const thoiGianBatDau = this.props.navigation.getParam(
      'thoiGianBatDau',
      'some default value',
    );
    this.setState({thoiGianBatDau: thoiGianBatDau});

    const thoiGianKetThuc = this.props.navigation.getParam(
      'thoiGianKetThuc',
      'some default value',
    );
    this.setState({thoiGianKetThuc: thoiGianKetThuc});

    const TenKH = this.props.navigation.getParam('title', 'some default value');
    this.setState({TenKH: TenKH});

    this.props.getClassAction(courseId);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.getClassAction(this.state.courseId);
    }

    if (prevProps.data !== this.props.data) {
      if (this.props.data.type === 'GET_CLASS_ERROR') {
        Alert.alert('Lỗi rồi!!!', this.props.data.message);
      } else if (this.props.data.type === 'GET_CLASS_SUCCESS') {
        this.setState({data: this.props.data.data});
      }
    }

    if (prevProps.dataDelete !== this.props.dataDelete) {
      if (this.props.dataDelete === 'DELETE_CLASS_ERROR') {
        Alert.alert('Lỗi rồi!!!', this.props.dataDelete.message);
      } else if (this.props.dataDelete !== null) {
        if (this.props.dataDelete.type === 'DELETE_CLASS_SUCCESS') {
          this.props.getClassAction(this.state.courseId);

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
        <SafeAreaView />
        <View style={styles.ContainerMenu}>
          <TouchableOpacity
            style={styles.Menu}
            onPress={() => this.props.navigation.goBack()}>
            {/* <Image
              source={require('../res/images/back.png')}
              style={{width: 20, height: 20}}
            /> */}
            <Ionicons name="chevron-back" color="#d4d5d8" size={Size.h52} />
          </TouchableOpacity>
          <Text style={styles.Title}>QUẢN LÝ BUỔI HỌC</Text>
          <TouchableOpacity
            style={styles.Plus}
            onPress={() => {
              this.props.navigation.navigate('AddClass', {
                courseId: this.state.courseId,
                thoiGianBatDau: this.state.thoiGianBatDau,
                thoiGianKetThuc: this.state.thoiGianKetThuc,
              });
            }}>
            {/* <Image
              source={require('../res/images/ic_plus.png')}
              style={{width: 20, height: 20}}
            /> */}
            <FontAwesome5
              name={'plus'}
              color="#d4d5d8"
              size={Size.h40}
              // style={[styles.Image]}
            />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={2} style={styles.TenKH}>
          {this.state.TenKH}
        </Text>
        <ScrollView
          style={{
            paddingBottom: '4%',
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.props.getClassAction(this.state.courseId);
                }}
              />
            }
            style={{
              marginBottom: '2%',
            }}
            data={this.state.data}
            renderItem={(item) => this.renderItem(item)}
            extraData={this.state}
            keyExtractor={(item) => {
              return item.classId;
            }}
          />
        </ScrollView>
      </View>
    );
  }

  renderItem = ({item}) => {
    let buildingId = item.buildingId;
    let buildingName = item.buildingName;
    let classId = item.classId;
    let className = item.className;
    let code = item.code;
    let courseId = item.courseId;
    let courseName = item.courseName;
    let created_by = item.created_by;
    let date = item.date;
    let endedTime = item.endedTime;
    let roomId = item.roomId;
    let roomName = item.roomName;
    let startedTime = item.startedTime;
    let trainer = item.trainer;
    let wifi = item.wifi;

    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: Size.h34,
                fontWeight: 'bold',
                color: 'darkslategrey',
                flex: 15,
                marginRight: 50,
                color: '#394e65',
              }}>
              {className}
            </Text>
            <Menu
              style={{
                flex: 1,
                padding: 5,
              }}
              delete={() => {
                this.props.deleteClassAction(classId.trim());
              }}
              edit={() => {
                this.props.navigation.navigate('EditClass', {
                  classId: classId.trim(),
                  className: className,
                  trainer: trainer,
                  date: date,
                  startedTime: startedTime,
                  endedTime: endedTime,
                  buildingId: buildingId,
                  roomId: roomId,
                  thoiGianBatDau: this.state.thoiGianBatDau,
                  thoiGianKetThuc: this.state.thoiGianKetThuc,
                });
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <FontAwesome5
              name={'user-tie'}
              color="#FFD237"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text style={{fontSize: Size.h32, color: '#3c5360'}}>
              Giảng viên:{' '}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#0a8dc3',
                fontSize: Size.h32,
                flex: 1,
                marginRight: 50,
                fontWeight: 'bold',
              }}>
              {trainer}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <FontAwesome5
              name={'address-card'}
              color="#412F4E"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text style={{fontSize: Size.h32, color: '#3c5360'}}>
              Cán bộ quản lý:{' '}
            </Text>
            <Text
              style={{
                color: '#f19440',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {created_by}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <FontAwesome5
              name={'calendar-check'}
              color="#42C8FB"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text style={{fontSize: Size.h32, color: '#3c5360'}}>Ngày: </Text>
            <Text
              style={{
                color: '#364966',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {formatDate(date)}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <AntDesign
              name={'clockcircleo'}
              color="#d43648"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text style={{fontSize: Size.h32, color: '#3c5360'}}>
              Thời gian:{' '}
            </Text>
            <Text
              style={{
                color: '#d43648',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {startedTime}
            </Text>
            <Text
              style={{
                color: '#d43648',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {' '}
              -{' '}
            </Text>
            <Text
              style={{
                color: '#d43648',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {endedTime}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <FontAwesome5
              name={'building'}
              color="#0090D7"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text style={{fontSize: Size.h32, color: '#3c5360'}}>
              Tòa nhà:{' '}
            </Text>
            <Text
              style={{
                color: '#364966',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {buildingName}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <FontAwesome5
              name={'chalkboard-teacher'}
              color="#FF9226"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text style={{fontSize: Size.h32, color: '#3c5360'}}>Phòng: </Text>
            <Text
              style={{
                color: '#364966',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {roomName}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <FontAwesome5
              name={'wifi'}
              color="#14bb87"
              size={Size.h40}
              style={[styles.icon]}
            />
            <Text
              style={{
                flex: 10,
                color: '#364966',
                fontSize: Size.h32,
                fontWeight: 'bold',
              }}>
              {wifi}
            </Text>
            <View
              style={{
                flex: 3,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'flex-end',
                  fontWeight: 'bold',
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  borderRadius: 50,
                  backgroundColor: '#e7ebee',
                  color: '#d67e3e',
                }}>
                {code}
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
    padding: '5%',
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
  title: {
    fontSize: Size.h34,
    fontWeight: 'bold',
    color: 'darkslategrey',
  },
  data: {
    fontSize: Size.h32,
    fontWeight: 'bold',
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
    color: '#1f4b68',
    paddingVertical: '4%',
    // backgroundColor: 'red',
  },
  TenKH: {
    fontSize: Size.h34,
    color: '#0a8dc3',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: '2%',
    marginHorizontal: '5%',
  },
});
