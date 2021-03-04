import {
  GET_CLASS,
  GET_CLASS_ERROR,
  GET_CLASS_SUCCESS,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {getClassApi} from '../api/getClassApi';

function* getClassSaga(action) {
  const response = yield getClassApi(action.data);

  if (response !== undefined) {
    if (response.resultCode == 1) {
      yield put({
        type: GET_CLASS_SUCCESS,
        data: response.data,
        message: response.message,
      });
    } else {
      yield put({
        type: GET_CLASS_ERROR,
        data: null,
        message: response.message,
      });
    }
  } else {
    yield put({
      type: GET_CLASS_ERROR,
      data: null,
      message: 'Kết nối không thành công',
    });
  }
}

export function* watchClassSaga() {
  yield takeEvery(GET_CLASS, getClassSaga);
}
