import {
  DELETE_COURSE,
  DELETE_COURSE_ERROR,
  DELETE_COURSE_SUCCESS,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {deleteCourseApi} from '../api/deleteCourseApi';

function* deleteCourse(action) {
  const response = yield deleteCourseApi(action.data);

  if (response !== undefined) {
    if (response.resultCode == 1) {
      yield put({
        type: DELETE_COURSE_SUCCESS,
        message: response.message,
      });
    } else {
      yield put({
        type: DELETE_COURSE_ERROR,
        message: response.message,
      });
    }
  } else {
    yield put({
      type: DELETE_COURSE_ERROR,
      message: 'Kết nối không thành công',
    });
  }
}

export function* deleteCourseSaga() {
  yield takeEvery(DELETE_COURSE, deleteCourse);
}
