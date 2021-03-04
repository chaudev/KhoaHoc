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
import {get_BuildingRoom} from '../api/getBuildingRoom';

function* getBuildingRoom(action) {
  let response = yield get_BuildingRoom();

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
    console.log('Loi ket noi : ---------');
    yield put({
      type: GET_BUILDING_ROOM_ERROR,
      data: null,
      message: 'Không thể kết nối..',
    });
  }
}

export function* watchBuildingRoom() {
  yield takeEvery(GET_BUILDING_ROOM, getBuildingRoom);
}
