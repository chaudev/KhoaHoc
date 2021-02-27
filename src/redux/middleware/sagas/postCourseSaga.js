import {
  POST_COURSE,
  POST_COURSE_ERROR,
  POST_COURSE_SUCCESS,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {postCourseAPI} from '../api/postCourseAPI';

function* postCourse(action) {
  const {
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  } = action.data;

  const response = yield postCourseAPI(
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
        type: POST_COURSE_SUCCESS,
        data: response,
        message: response.message,
      });
    } else {
      yield put({
        type: POST_COURSE_ERROR,
        data: response,
        message: response.message,
      });
    }
  }
}

export function* watchCourseSaga() {
  yield takeEvery(POST_COURSE, postCourse);
}
