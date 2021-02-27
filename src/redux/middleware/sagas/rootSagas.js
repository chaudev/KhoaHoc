import {all} from 'redux-saga/effects';
import {watchLogin} from './loginSaga';
import {watchCourse} from './getCourseSaga';
import {watchBuildingRoom} from './getBuildingRoomSaga';
import {watchCourseSaga} from './postCourseSaga';
import {deleteCourseSaga} from './deleteCourseSaga';
import {deleteClassSaga} from './deleteClassSaga';
import {watchEditCourseSaga} from './editCourseSaga';
import {watchClassSaga} from './getClassSaga';
import {watchPostClass} from './postClassSaga';
import {watchEditClassSaga} from './editClassSaga';

export default function* rootSagas() {
  yield all([
    watchLogin(),
    watchCourse(),
    watchBuildingRoom(),
    watchCourseSaga(),
    deleteCourseSaga(),
    watchEditCourseSaga(),
    watchClassSaga(),
    watchPostClass(),
    watchEditClassSaga(),
    deleteClassSaga(),
  ]);
}
