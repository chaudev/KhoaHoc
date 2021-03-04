import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {getCourseApi} from '../api/getCourse';

function* getCourse(action) {
  var response = yield getCourseApi();

  if (response !== undefined) {
    if (response.resultCode === 1) {
      yield put({
        type: GET_COURSE_SUCCESS,
        data: response.data,
        message: response.message,
      });
    } else {
      yield put({
        type: GET_COURSE_ERROR,
        data: null,
        message: response.message,
      });
    }
  } else {
    yield put({
      type: GET_COURSE_ERROR,
      data: null,
      message: 'Kết nối không thành công',
    });
  }
}

export function* watchCourse() {
  yield takeEvery(GET_COURSE, getCourse);
}
