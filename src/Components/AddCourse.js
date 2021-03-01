import React from 'react';
import Size from '../res/Size';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  Image,
  ActivityIndicator,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
// import ionicons from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
console.disableYellowBox = true;

const formatDate = (value) => {
  let day = new Date(value);
  let stringDate =
    day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear() + '';
  return stringDate;
};

export default class AddCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateStart: new Date(),
      flagDateStart: 0,
      flagDateEnd: 0,
      dateEnd: new Date(),
      mode: 'date',
      showStart: false,
      showEnd: false,
      countries: 'uk',
      tenKhoaHoc: '',
      tenGiangVien: '',
      dataBuilding: [],
      dataRoom: [],
      buildingSelected: '',
      roomSelected: '',
      xxx: [],
      strThieuTen: '',
      strThieuGV: '',
      strThieuToaNha: '',
      strThieuPhong: '',
      colorStart: 'black',
      colorEnd: 'black',
      errorDate: false,
      colorDate: 'black',
      strDateStart: 'Chọn ngày',
      strDateEnd: 'Chọn ngày',
      errorText: 'Ngày bắt đầu không được lớn hơn ngày kết thúc',
      showBuilding: false,
      showRoom: false,
      isVisibleA: false,
      isVisibleB: false,
      errorBuilding: false,
      errorName: false,
      errorGV: false,
      errorRoom: false,
      modelStartVisible: false,
      modelEndVisible: false,
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.type === 'GET_BUILDING_ROOM_ERROR') {
      } else if (this.props.data.type === 'GET_BUILDING_ROOM_SUCCESS') {
        var convertDataBuilding = this.props.data.data.map(function (obj) {
          return {label: obj.buildingName, value: obj._id};
        });

        this.setState({dataBuilding: convertDataBuilding});
      }
    } else {
      console.log('addCourse componentDidUpdate -- revProp khong doi');
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
            <Ionicons name="chevron-back" color="#d4d5d8" size={Size.h52} />
          </TouchableOpacity>
          <Text style={styles.Title}>TẠO MỚI KHÓA HỌC</Text>
          <TouchableOpacity style={styles.Plus}>
            <Image
              source={require('../res/images/ao.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            backgroundColor: 'f4f7fc',
            paddingHorizontal: '4%',
          }}>
          {/* Nhập tên khóa học */}
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Tên khóa</Text>
              <Text style={styles.text1}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              onFocus={() =>
                this.setState({isVisibleA: false, isVisibleB: false})
              }
              placeholder="Nhập tên khóa học"
              onChangeText={(text) => this.setState({tenKhoaHoc: text})}
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
              <Text style={styles.text}>Giảng viên</Text>
              <Text style={styles.text1}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              onFocus={() =>
                this.setState({isVisibleA: false, isVisibleB: false})
              }
              placeholder="Nhập tên giảng viên"
              onChangeText={(text) => this.setState({tenGiangVien: text})}
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

          {/* Chọn ngày */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            {/* Chọn ngày bắt đầu */}
            <View
              style={{
                width: '50%',
                paddingRight: '1%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Từ ngày</Text>
                <Text style={styles.text1}> *</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.showDatePickerStart()}
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
                    color: '#3b556d',
                  }}>
                  {this.state.strDateStart}
                </Text>
                {/* <Icon
                  name="down"
                  size={Size.h34}
                  color="#1f4b68"
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    justifyContent: 'flex-end',
                  }}
                /> */}
                <DateTimePickerModal
                  isVisible={this.state.modelStartVisible}
                  mode="date"
                  date={this.state.dateStart}
                  onConfirm={(date) => this.handleConfirmStart(date)}
                  onCancel={() => this.hideDatePickerStart()}
                />
              </TouchableOpacity>
            </View>

            {/* Chọn ngày kết thúc*/}
            <View
              style={{
                width: '50%',
                paddingLeft: '1%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Đến ngày</Text>
                <Text style={styles.text1}> *</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.showDatePickerEnd()}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  paddingVertical: 13,
                  borderColor: '#c2c2c2',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: Size.h30,
                    marginLeft: 10,
                    color: '#3b556d',
                  }}>
                  {this.state.strDateEnd}
                </Text>
                {/* <Icon
                  name="down"
                  size={Size.h34}
                  color="#1f4b68"
                  style={{marginLeft: 5, marginRight: 10}}
                /> */}
                <DateTimePickerModal
                  isVisible={this.state.modelEndVisible}
                  mode="date"
                  date={this.state.dateEnd}
                  minimumDate={this.state.dateStart}
                  onConfirm={(date) => this.handleConfirmEnd(date)}
                  onCancel={() => this.hideDatePickerEnd()}
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
                {this.state.errorText}
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
                color: '#3b556d',
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
                color: '#3b556d',
                zIndex: 101,
              }}
              labelStyle={{
                color: '#3b556d',
                fontSize: Size.h30,
              }}
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
                color: '#3b556d',
              }}
              dropDownStyle={{
                backgroundColor: '#fff',
              }}
              labelStyle={{
                // color: 'black',
                color: '#3b556d',
                fontSize: Size.h30,
              }}
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
              onPress={() => this.onClickSaveButton()}>
              <Icon name="save" size={18} color="#fff" />
              <Text style={{color: '#fff', marginLeft: 5, fontSize: Size.h32}}>
                LƯU
              </Text>
            </TouchableOpacity>
          </View>

          {/* Màn hình loading */}
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

  // Ngay bat dau
  showDatePickerStart() {
    console.log('showDatePickerTest : chay');
    this.setState({modelStartVisible: true});
  }

  hideDatePickerStart() {
    console.log('hideDatePickertest : chay');
    this.setState({modelStartVisible: false});
  }

  handleConfirmStart(date) {
    this.hideDatePickerStart();
    const currentDate = date || dateStart;
    this.setState({dateStart: currentDate});
    this.setState({strDateStart: formatDate(currentDate)});
    this.setState({flagDateStart: 1});
  }

  // Ngay ket thuc
  showDatePickerEnd() {
    this.setState({modelEndVisible: true});
  }

  hideDatePickerEnd() {
    this.setState({modelEndVisible: false});
  }

  handleConfirmEnd(date) {
    this.hideDatePickerEnd();
    const currentDate = date || dateStart;
    this.setState({dateEnd: currentDate});
    this.setState({strDateEnd: formatDate(currentDate)});
    this.setState({flagDateEnd: 1});
  }

  // Nhấn nút lưu
  onClickSaveButton() {
    this.onClickSave();
  }

  //Check 2 khoảng trắng gần nhau
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

  // Hiện tất cả dữ liệu đã nhập
  showData() {
    Alert.alert(
      'Thông tin',
      'Tên khóa học: ' +
        this.state.tenKhoaHoc +
        '\nTên Giảng viên: ' +
        this.state.tenGiangVien +
        '\nNgày bắt đầu: ' +
        this.state.dateStart +
        '\nNgày kết thúc: ' +
        this.state.dateEnd +
        '\nTòa nhà: ' +
        this.state.buildingSelected +
        '\nPhòng: ' +
        this.state.roomSelected,
    );
    // }
  }

  // Check time
  checkTimeStartEnd() {
    if (this.state.dateStart > this.state.dateEnd) {
      return false;
    } else {
      return true;
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

    this.setState({errorDate: false});
    this.setState({colorStart: 'black'});
    this.setState({colorEnd: 'black'});
    if (
      this.state.tenKhoaHoc.trim() !== '' &&
      this.state.tenGiangVien.trim() !== '' &&
      this.state.buildingSelected.trim() !== '' &&
      this.state.flagDateEnd !== 0 &&
      this.state.flagDateStart !== 0 &&
      this.state.roomSelected.trim() !== '' &&
      this.checkTimeStartEnd() !== false
    ) {
      return true;
    } else {
      return false;
    }
  }

  //Lưu khóa học
  onClickSave() {
    this.setState({isVisibleA: false, isVisibleB: false});
    if (this.checkAllInfo() === false) {
      if (this.state.tenKhoaHoc.trim() === '') {
        this.setState({strThieuTen: 'Tên khóa học không thể trống'});
        this.setState({errorName: true});
      }
      if (this.state.tenGiangVien.trim() === '') {
        this.setState({strThieuGV: 'Tên giảng viên không thể trống'});
        this.setState({errorGV: true});
      }
      if (this.state.buildingSelected.trim() === '') {
        this.setState({strThieuToaNha: 'Vui lòng chọn tòa nhà'});
        this.setState({errorBuilding: true});
      }
      if (this.state.roomSelected.trim() === '') {
        this.setState({strThieuPhong: 'Vui lòng chọn phòng'});
        this.setState({errorRoom: true});
      }
      if (this.state.flagDateStart === 0) {
        this.setState({colorStart: 'red'});
        this.setState({errorDate: true});
        this.setState({errorText: 'Vui lòng chọn ngày bắt đầu'});
      } else if (this.state.flagDateEnd === 0) {
        this.setState({colorEnd: 'red'});
        this.setState({errorDate: true});
        this.setState({errorText: 'Vui lòng chọn ngày kết thúc'});
      } else if (this.checkTimeStartEnd() === false) {
        this.setState({errorDate: true});
        this.setState({colorEnd: 'red'});
        this.setState({colorStart: 'red'});
        this.setState({
          errorText: 'Ngày bắt đầu không được sau ngày kết thúc',
        });
      }
    } else {
      this.props.postCourseAction(
        this.superTrim(this.state.tenKhoaHoc),
        this.superTrim(this.state.tenGiangVien),
        this.state.dateStart,
        this.state.dateEnd,
        this.state.buildingSelected.trim(),
        this.state.roomSelected.trim(),
      );
      ToastAndroid.showWithGravity(
        'Thêm thành công!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      this.props.navigation.goBack();
    }
  }

  // Chọn toàn nhà
  onChangeDataBuilding(item) {
    if (this.state.buildingSelected !== item.value) {
      this.setState({buildingSelected: item.value}, () => {
        this.controller.state.choice.label = null;
        this.setState({roomSelected: ''});
        this.setState({dataRoom: []});
        for (let i = 0; i < this.props.data.data.length; i++) {
          if (this.props.data.data[i]._id === this.state.buildingSelected) {
            var convertDataRoom = this.props.data.data[i].room.map(function (
              obj,
            ) {
              return {label: obj.roomName, value: obj._id};
            });

            this.setState({dataRoom: convertDataRoom});
          }
        }
      });
    }
  }

  // Chọn phòng
  onChangeDataRoom(item) {
    this.setState({roomSelected: item.value});
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 10,
    // paddingBottom: 200,
  },
  text: {
    fontSize: Size.h36,
    fontWeight: 'bold',
    color: '#094c8d',
    marginTop: 10,
    marginBottom: 5,
  },
  text1: {
    fontSize: Size.h36,
    fontWeight: 'bold',
    color: '#ff0303',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    color: '#3b556d',
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
    color: '#3b556d',
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
