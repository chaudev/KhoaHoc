import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
  GET_BUILDING_ROOM,
  GET_BUILDING_ROOM_SUCCESS,
  GET_BUILDING_ROOM_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {getBuildingRoomApi} from '../api/getBuildingRoom';

function* getBuildingRoom(action) {
  let response = yield getBuildingRoomApi();

  if (response !== undefined) {
    if (response.resultCode === 1) {
      yield put({
        type: GET_BUILDING_ROOM_SUCCESS,
        data: response.data,
        message: response.message,
      });
    } else {
      yield put({
        type: GET_BUILDING_ROOM_ERROR,
        data: null,
        message: response.message,
      });
    }
  } else {
    yield put({
      type: GET_BUILDING_ROOM_ERROR,
      data: null,
      message: 'Kết nối không thành công',
    });
  }
}

export function* watchBuildingRoom() {
  yield takeEvery(GET_BUILDING_ROOM, getBuildingRoom);
}
