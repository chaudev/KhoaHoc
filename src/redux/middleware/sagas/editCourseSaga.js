import {
  EDIT_COURSE,
  EDIT_COURSE_ERROR,
  EDIT_COURSE_SUCCESS,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {editCourseApi} from '../api/editCourseApi';

function* editCourse(action) {
  const {
    courseId,
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  } = action.data;

  const response = yield editCourseApi(
    courseId,
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  );

  if (response !== undefined) {
    if (response.resultCode == 1) {
      yield put({
        type: EDIT_COURSE_SUCCESS,
        data: response,
        message: response.message,
      });
    } else {
      yield put({
        type: EDIT_COURSE_ERROR,
        data: response,
        message: response.message,
      });
    }
  }
}

export function* watchEditCourseSaga() {
  yield takeEvery(EDIT_COURSE, editCourse);
}
