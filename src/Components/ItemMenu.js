import React, {PureComponent} from 'react';
import {TouchableOpacity, Alert, Image, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu, {MenuItem} from 'react-native-material-menu';
import Sizes from '../res/Size';

import More from '../res/images/more.png';

export default class menu extends PureComponent {
  constructor(props) {
    super(props);
  }

  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  changeMenu = () => {
    this._menu.hide();
    this.props.edit();
  };
  xoaOption = () => {
    Alert.alert('Thông báo', 'Bạn có chắc là muốn xóa không ?', [
      {
        text: 'Không',
        onPress: () => {
          console.log('không xóa');
        },
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: () => {
          console.log('Xoá');
          this.props.delete();
        },
      },
    ]);
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <TouchableOpacity
        style={[
          {alignItems: 'center', justifyContent: 'flex-start'},
          this.props.style,
        ]}>
        <Menu
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          ref={this.setMenuRef}
          button={
            <TouchableOpacity
              style={{
                alignItems: 'center',
                paddingLeft: 10,
                paddingBottom: 10,
                // backgroundColor: 'red',
              }}
              onPress={this.showMenu}>
              <FontAwesome5
                name={'ellipsis-v'}
                color="#808080"
                size={Sizes.h40}
              />
              {/* <Image style={{width: 25, height: 25}} source={More} /> */}
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.changeMenu}>
            <Text style={{fontSize: Sizes.h30, color: '#4b5b6b'}}>Sửa</Text>
          </MenuItem>
          <MenuItem onPress={this.xoaOption}>
            <Text style={{fontSize: Sizes.h30, color: '#4b5b6b'}}>Xóa</Text>
          </MenuItem>
        </Menu>
      </TouchableOpacity>
    );
  }
}
