import {
  EDIT_CLASS,
  EDIT_CLASS_ERROR,
  EDIT_CLASS_SUCCESS,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {editClassApi} from '../api/editClassApi';

function* editClass(action) {
  const {
    classId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  } = action.data;

  const response = yield editClassApi(
    classId,
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
        type: EDIT_CLASS_SUCCESS,
        data: response,
        message: response.message,
      });
    } else {
      yield put({
        type: EDIT_CLASS_ERROR,
        data: response,
        message: response.message,
      });
    }
  }
}

export function* watchEditClassSaga() {
  yield takeEvery(EDIT_CLASS, editClass);
}
