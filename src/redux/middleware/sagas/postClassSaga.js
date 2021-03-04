import {
  POST_CLASS,
  POST_CLASS_SUCCESS,
  POST_CLASS_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {postClassApi} from '../api/postClassApi';

function* postClassSaga(action) {
  const {
    courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  } = action.data;

  const response = yield postClassApi(
    courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  );

  if (response !== undefined) {
    if (response.resultCode == 1) {
      yield put({
        type: POST_CLASS_SUCCESS,
        data: response,
        message: response.message,
      });
    } else {
      yield put({
        type: POST_CLASS_ERROR,
        data: response,
        message: response.message,
      });
    }
  } else {
    yield put({
      type: POST_CLASS_ERROR,
      message: 'Kết nối không thành công',
    });
  }
}

export function* watchPostClass() {
  yield takeEvery(POST_CLASS, postClassSaga);
}
