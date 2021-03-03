import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import Size from '../res/Size';

import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DateTimePicker from '@react-native-community/datetimepicker';
console.disableYellowBox = true;

const formatTime = (value) => {
  let day = new Date(value);
  let stringTime =
    checkLength(day.getHours()) + ':' + checkLength(day.getMinutes()) + '';
  return stringTime;
};

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

const stringToTime = (time) => {
  if (time.length === 4 && time.charAt(1) === ':') {
    let x = '0' + time.charAt(0) + ':' + time.charAt(2) + time.charAt(3);
    return x;
  } else if (time.length === 4 && time.charAt(2) === ':') {
    let x = time.charAt(0) + time.charAt(1) + ':' + '0' + time.charAt(3);
    return x;
  } else if (time.length === 3 && time.charAt(1) === ':') {
    let x = '0' + time.charAt(0) + ':' + '0' + time.charAt(2);
    return x;
  } else {
    let x =
      time.charAt(0) + time.charAt(1) + ':' + time.charAt(3) + time.charAt(4);
    return x;
  }
};

const getDateFromStringTime = (time) => {
  let x = new Date(
    'Fri Jan 28 2021 ' + stringToTime(time) + ':00' + ' GMT+7 (EST)',
  );
  return x;
};

export default class EditClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateNow: new Date('Fri Jan 28 2021 10:34:23 GMT-0500 (EST)'),
      date: new Date(),
      defaultDate: new Date(),
      flagDate: 0,
      flag: 0,
      startedTime: new Date(),
      strStartedTime: '',
      strEndedTime: '',
      flagStart: 0,
      endedTime: new Date(),
      flagEnd: 0,
      mode: 'date',
      modeTime: 'time',
      showDate: false,
      showStart: false,
      showEnd: false,
      classId: '',
      className: '',
      trainer: '',
      dataBuilding: [],
      dataRoom: [],
      buildingId: '',
      roomId: '',
      courseId: '',
      stringEndTime: '',
      stringStartTime: '',
      stringDate: '',
      strThieuTen: '',
      strThieuGV: '',
      strThieuToaNha: '',
      strThieuPhong: '',
      strThieuStartTime: '',
      strThieuEndTime: '',
      strThieuDate: '',
      strErrorTime: '',
      colorRed: 'red',
      colorBlack: 'black',
      colorStart: 'black',
      colorEnd: 'black',
      errorDate: false,
      colorDate: 'black',
      defaultRoom: '',
      showBuilding: false,
      showRoom: false,
      isVisibleA: false,
      isVisibleB: false,
      showBuilding: false,
      showRoom: false,
      isVisibleA: false,
      isVisibleB: false,
      errorBuilding: false,
      errorName: false,
      errorGV: false,
      errorRoom: false,
      showBuilding: false,
      showRoom: false,
      isVisibleA: false,
      isVisibleB: false,
      errorBuilding: false,
      errorName: false,
      errorGV: false,
      errorRoom: false,
      errorDate: false,
      errorTime: false,
      thoiGianBatDau: new Date(),
      thoiGianKetThuc: new Date(),
      modelStartVisible: false,
      modelEndVisible: false,
      modelDateVisible: false,
    };
  }

  changeVisibility(state) {
    this.setState({
      isVisibleA: false,
      isVisibleB: false,
      showStart: false,
      showEnd: false,
      ...state,
    });
  }

  componentDidMount() {
    this.props.getBuildingRoomAction();

    const classId = this.props.navigation.getParam(
      'classId',
      'some default value',
    );
    this.setState({classId: classId});
    const thoiGianBatDau = this.props.navigation.getParam(
      'thoiGianBatDau',
      'some default value',
    );
    this.setState({thoiGianBatDau: thoiGianBatDau});
    // this.setState({strStartedTime: });

    const thoiGianKetThuc = this.props.navigation.getParam(
      'thoiGianKetThuc',
      'some default value',
    );
    this.setState({thoiGianKetThuc: thoiGianKetThuc});
    const className = this.props.navigation.getParam(
      'className',
      'some default value',
    );
    this.setState({className: className});
    const trainer = this.props.navigation.getParam(
      'trainer',
      'some default value',
    );
    this.setState({trainer: trainer});

    const startedTime = this.props.navigation.getParam(
      'startedTime',
      'some default value',
    );
    this.setState({strStartedTime: startedTime});
    this.setState({
      startedTime: getDateFromStringTime(startedTime),
    });

    const date = this.props.navigation.getParam('date', 'some default value');
    this.setState({date: new Date(date)});
    this.setState({stringDate: formatDate(new Date(date))});

    const endedTime = this.props.navigation.getParam(
      'endedTime',
      'some default value',
    );
    this.setState({strEndedTime: endedTime});
    this.setState({
      endedTime: getDateFromStringTime(endedTime),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.type === 'GET_BUILDING_ROOM_ERROR') {
      } else if (this.props.data.type === 'GET_BUILDING_ROOM_SUCCESS') {
        var convertDataBuilding = this.props.data.data.map(function (obj) {
          return {label: obj.buildingName, value: obj._id};
        });

        this.setState({dataBuilding: convertDataBuilding});

        const buildingId = this.props.navigation.getParam(
          'buildingId',
          'some default value',
        );
        this.setState({buildingId: buildingId}, () => this.getDataRom());
      }
    } else {
      console.log('EditCourse componentDidUpdate -- revProp khong doi');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.ContainerMenu}>
          <TouchableOpacity
            style={styles.Menu}
            onPress={() => this.props.navigation.goBack()}>
            {/* <Image
              source={require('../res/images/back.png')}
              style={styles.Image}
            /> */}
            <Ionicons name="chevron-back" color="#d4d5d8" size={Size.h52} />
          </TouchableOpacity>
          <Text style={styles.Title}>SỬA BUỔI HỌC</Text>
          <TouchableOpacity style={styles.Plus}>
            <Image
              source={require('../res/images/ao.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: 'f4f7fc', paddingHorizontal: 10}}>
          {/* Nhập tên lớp học */}
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Tên buổi học</Text>
              <Text style={styles.text1}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              onFocus={() =>
                this.setState({isVisibleA: false, isVisibleB: false})
              }
              placeholder="Nhập tên khóa học"
              onChangeText={(text) => this.setState({className: text})}
              value={this.state.className}
            />
          </View>
          {/* Báo lỗi khóa học */}
          <View>
            {this.state.errorName && (
              <Text
                style={{
                  color: 'red',
                  fontSize: Size.h30,
                  marginTop: '1%',
                  fontStyle: 'italic',
                  textAlign: 'left',
                }}>
                {this.state.strThieuTen}
              </Text>
            )}
          </View>

          {/* Nhập tên giảng viên */}
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Tên giảng viên </Text>
              <Text style={styles.text1}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              onFocus={() =>
                this.setState({isVisibleA: false, isVisibleB: false})
              }
              placeholder="Nhập tên giảng viên"
              onChangeText={(text) => this.setState({trainer: text})}
              value={this.state.trainer}
            />
          </View>
          {/* Báo lỗi giảng viên */}
          <View>
            {this.state.errorGV && (
              <Text
                style={{
                  color: 'red',
                  fontSize: Size.h30,
                  marginTop: '1%',
                  fontStyle: 'italic',
                  textAlign: 'left',
                }}>
                {this.state.strThieuGV}
              </Text>
            )}
          </View>

          {/* Chọn ngày bắt đầu */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '50%',
                paddingRight: '1%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}>Chọn ngày</Text>
                <Text style={styles.text1}> *</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.showDatePicker()}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  paddingVertical: 13,
                  borderColor: '#c2c2c2',
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: Size.h30,
                    color: '#4b5b6b',
                  }}>
                  {this.checkDate(this.state.date)}
                </Text>
                <Icon
                  name="sort-down"
                  size={Size.h36}
                  color="#4b5b6b"
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    marginBottom: 5,
                    justifyContent: 'flex-end',
                  }}
                />
                <DateTimePickerModal
                  isVisible={this.state.modelDateVisible}
                  mode="date"
                  date={this.state.date}
                  minimumDate={new Date(this.state.thoiGianBatDau)}
                  maximumDate={new Date(this.state.thoiGianKetThuc)}
                  onConfirm={(date) => this.handleConfirmDate(date)}
                  onCancel={() => this.hideDatePickerDate()}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Báo lỗi ngày */}
          <View>
            {this.state.errorDate && (
              <Text
                style={{
                  color: 'red',
                  fontSize: Size.h30,
                  marginTop: 10,
                  fontStyle: 'italic',
                }}>
                {this.state.strThieuDate}
              </Text>
            )}
          </View>

          {/* Chọn thời gian */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            {/* Chọn giờ bắt đầu */}
            <View
              style={{
                width: '50%',
                paddingRight: '1%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}>Chọn giờ bắt đầu</Text>
                <Text style={styles.text1}> *</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.showTimePickerStart()}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  paddingVertical: 13,
                  borderColor: '#c2c2c2',
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: Size.h30,
                    color: '#4b5b6b',
                  }}>
                  {this.checkTime(this.state.startedTime)}
                </Text>
                <Icon
                  name="sort-down"
                  size={Size.h36}
                  color="#4b5b6b"
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    marginBottom: 5,
                    justifyContent: 'flex-end',
                  }}
                />
                <DateTimePickerModal
                  isVisible={this.state.modelStartVisible}
                  mode="time"
                  date={this.state.startedTime}
                  onConfirm={(time) => this.handleConfirmStart(time)}
                  onCancel={() => this.hideTimePickerStart()}
                />
              </TouchableOpacity>
            </View>

            {/* Chọn thời gian kết thúc */}
            <View
              style={{
                width: '50%',
                paddingLeft: '1%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}>Chọn giờ kết thúc</Text>
                <Text style={styles.text1}> *</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.showTimePickerEnd()}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  paddingVertical: 13,
                  borderColor: '#c2c2c2',
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: Size.h30,
                    color: '#4b5b6b',
                  }}>
                  {this.checkTime(this.state.endedTime)}
                </Text>
                <Icon
                  name="sort-down"
                  size={Size.h36}
                  color="#4b5b6b"
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    marginBottom: 5,
                    justifyContent: 'flex-end',
                  }}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={this.state.modelEndVisible}
                mode="time"
                date={this.state.endedTime}
                onConfirm={(time) => this.handleConfirmEnd(time)}
                onCancel={() => this.hideTimePickerEnd()}
              />
            </View>
          </View>

          {/* Báo lỗi giờ */}
          <View>
            {this.state.errorTime && (
              <Text
                style={{
                  color: 'red',
                  fontSize: Size.h30,
                  marginTop: 10,
                  fontStyle: 'italic',
                }}>
                {this.state.strErrorTime}
              </Text>
            )}
          </View>

          {/* Chọn tòa nhà */}
          <View
            style={{
              ...Platform.select({
                ios: {
                  zIndex: 999,
                },
                android: {},
                default: {},
              }),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Tòa nhà</Text>
              <Text style={styles.text1}> *</Text>
            </View>
            <DropDownPicker
              isVisible={this.state.isVisibleA}
              onOpen={() =>
                this.changeVisibility({
                  isVisibleA: true,
                })
              }
              onClose={() =>
                this.setState({
                  isVisibleA: false,
                })
              }
              items={this.state.dataBuilding}
              containerStyle={{height: 50}}
              placeholder="Chọn tòa nhà"
              style={{
                backgroundColor: '#fff',
                borderColor: '#c2c2c2',
                zIndex: 100,
                fontSize: Size.h30,
              }}
              placeholderStyle={{
                color: 'gray',
                fontSize: Size.h30,
              }}
              selectedLabelStyle={{
                color: '#4b5b6b',
                fontSize: Size.h30,
              }}
              itemStyle={{
                justifyContent: 'flex-start',
                paddingVertical: 15,
                backgroundColor: '#fff',
                marginBottom: 5,
                paddingLeft: 10,
                borderRadius: 5,
                fontSize: Size.h30,
                color: '#4b5b6b',
                zIndex: 101,
              }}
              labelStyle={{
                color: '#4b5b6b',
                fontSize: Size.h30,
              }}
              arrowStyle={{marginBottom: 5}}
              defaultValue={this.state.buildingId}
              activeLabelStyle={{color: 'blue'}}
              dropDownStyle={{backgroundColor: '#fff'}}
              onChangeItem={(item) => this.onChangeDataBuilding(item)}
            />
          </View>

          {/* Báo lỗi tòa nhà */}
          <View>
            {this.state.errorBuilding && (
              <Text
                style={{
                  color: 'red',
                  fontSize: Size.h30,
                  marginTop: '1%',
                  fontStyle: 'italic',
                  textAlign: 'left',
                }}>
                {this.state.strThieuToaNha}
              </Text>
            )}
          </View>

          {/* Chọn phòng */}
          <View
            style={{
              ...Platform.select({
                ios: {
                  zIndex: 99,
                },
                android: {},
                default: {},
              }),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Phòng</Text>
              <Text style={styles.text1}> *</Text>
            </View>
            <DropDownPicker
              isVisible={this.state.isVisibleB}
              onOpen={() =>
                this.changeVisibility({
                  isVisibleB: true,
                })
              }
              onClose={() =>
                this.setState({
                  isVisibleB: false,
                })
              }
              items={this.state.dataRoom}
              placeholder="Chọn phòng"
              controller={(instance) => (this.controller = instance)}
              containerStyle={{height: 50}}
              style={{
                backgroundColor: '#FFF',
                borderColor: '#c2c2c2',
                zIndex: 98,
                fontSize: Size.h30,
              }}
              placeholderStyle={{
                color: 'gray',
              }}
              selectedLabelStyle={{
                color: '#000',
                fontSize: Size.h30,
              }}
              itemStyle={{
                justifyContent: 'flex-start',
                paddingVertical: 15,
                backgroundColor: '#fff',
                marginBottom: 5,
                paddingLeft: 10,
                borderRadius: 5,
                zIndex: 99,
                fontSize: Size.h30,
                color: '#4b5b6b',
              }}
              placeholderStyle={{
                color: 'gray',
                fontSize: Size.h30,
              }}
              selectedLabelStyle={{
                color: '#4b5b6b',
                fontSize: Size.h30,
              }}
              arrowStyle={{marginBottom: 5}}
              defaultValue={this.state.defaultRoom}
              activeLabelStyle={{color: 'blue'}}
              onChangeItem={(item) => this.onChangeDataRoom(item)}
            />
          </View>

          {/* Báo lỗi phòng */}
          <View>
            {this.state.errorRoom && (
              <Text
                style={{
                  color: 'red',
                  fontSize: Size.h30,
                  marginTop: '1%',
                  fontStyle: 'italic',
                  textAlign: 'left',
                }}>
                {this.state.strThieuPhong}
              </Text>
            )}
          </View>

          {/* Nút lưu */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginBottom: 90,
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onClickSave()}>
              <Icon name="save" size={18} color="#fff" />
              <Text style={{color: '#fff', marginLeft: 5, fontSize: Size.h32}}>
                LƯU
              </Text>
            </TouchableOpacity>
          </View>
          {this.props.fetching && (
            <ActivityIndicator
              size="large"
              color="#FF0000"
              style={styles.Indicator}
            />
          )}
        </ScrollView>
      </View>
    );
  }

  // Ngay
  showDatePicker() {
    this.setState({modelDateVisible: true});
  }

  hideDatePickerDate() {
    this.setState({modelDateVisible: false});
  }

  handleConfirmDate(datex) {
    this.hideDatePickerDate();
    const currentDate = datex || date;
    this.setState({date: currentDate});
    this.setState({stringDate: currentDate});
    this.setState({flagDate: 1});
  }

  // Bat Dau
  showTimePickerStart() {
    this.setState({modelStartVisible: true});
  }

  hideTimePickerStart() {
    this.setState({modelStartVisible: false});
  }

  handleConfirmStart(selectedTime) {
    this.hideTimePickerStart();
    const currentTime = selectedTime || startedTime;
    this.setState({startedTime: currentTime});
    this.setState({stringStartTime: formatTime(currentTime)});
    this.setState({flagStart: 1});
  }

  // Ket thuc
  showTimePickerEnd() {
    this.setState({modelEndVisible: true});
  }

  hideTimePickerEnd() {
    this.setState({modelEndVisible: false});
  }

  handleConfirmEnd(selectedTime) {
    this.hideTimePickerEnd();
    const currentTime = selectedTime || endedTime;
    this.setState({endedTime: currentTime});
    this.setState({stringEndTime: formatTime(currentTime)});
    this.setState({flagEnd: 1});
  }

  // Kiểm tra 2 khoảng trắng gần nhau
  checkTrim(text) {
    let dem = 0;
    for (let i = 0; i < text.length - 1; i++) {
      for (let j = i + 1; j < text.length; j++) {
        if (text.charAt(i) === ' ' && text.charAt(j) === ' ') {
          dem++;
          return false;
        }
      }
    }
    if (dem === 0) {
      return true;
    }
  }

  // Xóa tất cả khoảng trắng thừa
  superTrim(text) {
    let textA = text.split('   ').join(' ');
    let textB = textA.split('   ').join(' ');
    let textC = textB.split('  ').join(' ');
    let textD = textC.split('  ').join(' ');
    let textE = textD.split('  ').join(' ');
    let textF = textE.split('  ').join(' ');
    return textF.trim();
  }

  //Hiện tất cả dữ liệu đã nhập
  showData() {
    Alert.alert(
      'Tất cả dữ liệu đã nhập',
      'id khoa: ' +
        this.state.classId.trim() +
        'id khoa: ' +
        this.state.className.trim() +
        '\ntrainer: ' +
        this.state.trainer.trim() +
        '\ndate: ' +
        this.state.date +
        '\nstartedTime: ' +
        this.state.startedTime +
        '\nendedTime: ' +
        this.state.endedTime +
        '\nbuildingId: ' +
        this.state.buildingId +
        '\nroomId: ' +
        this.state.roomId,
    );
  }

  // Kiểm tra thời gian bắt đầu và kết thúc
  checkTimeStartEnd() {
    if (this.state.startedTime.getHours() === this.state.endedTime.getHours()) {
      if (
        this.state.startedTime.getMinutes() < this.state.endedTime.getMinutes()
      ) {
        return true;
      } else {
        return false;
      }
    } else if (
      this.state.startedTime.getHours() > this.state.endedTime.getHours()
    ) {
      return false;
    } else if (
      this.state.startedTime.getHours() < this.state.endedTime.getHours()
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Kiểm tra chọn ngày chưa
  checkDate(date) {
    if (date === '') {
      return 'Chọn ngày';
    } else {
      return formatDate(date);
    }
  }

  // Kiểm tra chọn thời gian chưa
  checkTime(time) {
    if (time === '') {
      return 'Chọn thời gian';
    } else {
      return formatTime(time);
    }
  }

  // Kiểm tra đầy đủ thông tin
  checkAllInfo() {
    this.setState({strThieuTen: ''});
    this.setState({errorName: false});

    this.setState({strThieuGV: ''});
    this.setState({errorGV: false});

    this.setState({strThieuToaNha: ''});
    this.setState({errorBuilding: false});

    this.setState({strThieuPhong: ''});
    this.setState({errorRoom: false});

    this.setState({strErrorTime: ''});
    this.setState({errorTime: false});

    this.setState({errorDate: false});
    if (
      this.state.className.trim() !== '' &&
      this.state.trainer.trim() !== '' &&
      this.state.buildingId.trim() !== '' &&
      this.state.roomId.trim() !== '' &&
      this.checkTimeStartEnd() !== false
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Lưu khóa học
  onClickSave() {
    this.setState({isVisibleA: false, isVisibleB: false});
    if (this.checkAllInfo() === false) {
      if (this.state.className.trim() === '') {
        this.setState({strThieuTen: 'Tên buổi học không thể trống'});
        this.setState({errorName: true});
      }
      if (this.state.trainer.trim() === '') {
        this.setState({strThieuGV: 'Tên giảng viên không thể trống'});
        this.setState({errorGV: true});
      }
      if (this.state.buildingId.trim() === '') {
        this.setState({strThieuToaNha: 'Vui lòng chọn tòa nhà'});
        this.setState({errorBuilding: true});
      }
      if (this.state.roomId.trim() === '') {
        this.setState({strThieuPhong: 'Vui lòng chọn phòng'});
        this.setState({errorRoom: true});
      }
      if (this.checkTimeStartEnd() === false) {
        this.setState({errorTime: true});
        this.setState({
          strErrorTime: 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc',
        });
      }
    } else {
      this.props.editClassAction(
        this.superTrim(this.state.classId),
        this.superTrim(this.state.className),
        this.superTrim(this.state.trainer),
        this.state.date,
        formatTime(this.state.startedTime),
        formatTime(this.state.endedTime),
        this.state.buildingId.trim(),
        this.state.roomId.trim(),
      );
      ToastAndroid.showWithGravity(
        'Sửa thành công!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      this.props.navigation.goBack();
    }
  }

  // Lấy dữ liệu phòng và tự chọn khi mới vào
  getDataRom() {
    this.controller.state.choice.label = null;
    this.setState({roomId: ''}, () => {});
    this.setState({dataRoom: []});
    for (let i = 0; i < this.props.data.data.length; i++) {
      if (this.props.data.data[i]._id === this.state.buildingId) {
        var convertDataRoom = this.props.data.data[i].room.map(function (obj) {
          return {label: obj.roomName, value: obj._id};
        });

        this.setState({dataRoom: convertDataRoom});
      }
    }

    if (this.state.flag === 0) {
      this.setState({flag: 1});
      const roomId = this.props.navigation.getParam(
        'roomId',
        'some default value',
      );
      this.setState({roomId: roomId}, () => {
        this.setState({defaultRoom: roomId});
      });
    }
  }

  // Chọn tòa nhà
  onChangeDataBuilding(item) {
    if (this.state.buildingId !== item.value) {
      this.setState({buildingId: item.value}, () => {
        this.getDataRom();
      });
    }
  }

  // Chọn phòng
  onChangeDataRoom(item) {
    this.setState({roomId: item.value});
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: Size.h36,
    fontWeight: 'bold',
    color: '#4b5b6b',
    marginTop: 10,
    marginBottom: 5,
  },
  text1: {
    fontSize: Size.h36,
    fontWeight: 'bold',
    color: 'transparent',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    color: '#4b5b6b',
    borderColor: '#c2c2c2',
    fontSize: Size.h30,
    paddingLeft: 15,
    paddingVertical: 13,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#ffa600',
    borderRadius: 5,
    marginTop: '5%',
    paddingVertical: 7,
    paddingHorizontal: 25,
    flexDirection: 'row',
    marginBottom: 10,
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
  textError: {
    fontSize: Size.h30,
    color: 'red',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  DateTimePickerEnd: {
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    borderColor: '#c2c2c2',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 11,
  },
  DateTimePickerStart: {
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    borderColor: '#c2c2c2',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 11,
  },
  DateTimePickerDate: {
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    borderColor: '#c2c2c2',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 11,
  },
  Image: {
    width: 5,
    height: 5,
    padding: 10,
  },
  Menu: {
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'flex-start',
    // backgroundColor: 'yellow',
  },
  Plus: {
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
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
});
