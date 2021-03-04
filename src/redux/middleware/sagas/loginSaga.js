import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  GET_COURSE,
  GET_COURSE_SUCCESS,
  GET_COURSE_ERROR,
} from '../../actions/actionTypes';
import {call, takeEvery, put} from 'redux-saga/effects';
import {postLogin} from '../api/login';

function* signInFlow(action) {
  const {user, pass} = action.data;

  try {
    const response = yield postLogin(user, pass);

    if (response !== undefined) {
      if (response.resultCode == 1) {
        yield put({
          type: POST_LOGIN_SUCCESS,
          data: response,
          message: response.message,
        });
      } else {
        yield put({
          type: POST_LOGIN_ERROR,
          data: response,
          message: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: POST_LOGIN_ERROR,
      data: null,
      message: 'Kết nối không thành công',
    });
  }
}

export function* watchLogin() {
  yield takeEvery(POST_LOGIN, signInFlow);
}
