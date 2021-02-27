import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Size from '../res/Size';

export default class InfoApp extends Component {
  render() {
    return (
      <View>
        <SafeAreaView />
        <View style={styles.ContainerMenu}>
          <TouchableOpacity
            style={styles.Menu}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../res/images/back.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Thêm Khóa Học</Text>
          <TouchableOpacity style={styles.Plus}>
            <Image
              source={require('../res/images/ao.png')}
              style={styles.Image}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../res/images/ic_fis.png')}
          />
          <Text style={{ fontSize: Size.h34, marginTop: 10 }}>
            FIS INSIGHT PORTAL
          </Text>
          <Text style={{ fontSize: Size.h30, color: 'gray' }}>
            Phiên bản: 1.0.0
          </Text>
        </View>
        <View style={{ margin: 10, alignItems: 'center' }}>
          <Text
            style={{ fontSize: Size.h38, fontWeight: 'bold', marginBottom: 5 }}>
            Thông tin liên hệ
          </Text>
          <Text style={{ fontSize: Size.h30, marginBottom: 5 }}>
            Nguyễn Phúc Bảo Châu
          </Text>
          <Text style={{ fontSize: Size.h30, marginBottom: 5 }}>
            Phone: 0775712017
          </Text>
          <Text style={{ fontSize: Size.h30, marginBottom: 5 }} t>
            Email: ChauNPB2@fpt.com.vn
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: Size.h40,
    fontWeight: 'bold',
    color: 'black',
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
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
