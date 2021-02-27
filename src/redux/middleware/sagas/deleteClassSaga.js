import {
  DELETE_CLASS,
  DELETE_CLASS_ERROR,
  DELETE_CLASS_SUCCESS,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {deleteClassApi} from '../api/deleteClassApi';

function* deleteClass(action) {

  const classId = action.data;

  const response = yield deleteClassApi(classId);

  if (response !== undefined) {
    if (response.resultCode == 1) {

      yield put({
        type: DELETE_CLASS_SUCCESS,
        message: response.message,
      });
    } else {
      yield put({
        type: DELETE_CLASS_ERROR,
        message: response.message,
      });
    }
  } else {
    yield put({
      type: DELETE_CLASS_ERROR,
      message: 'Lỗi kết nối',
    });
  }
}

export function* deleteClassSaga() {
  yield takeEvery(DELETE_CLASS, deleteClass);
}
