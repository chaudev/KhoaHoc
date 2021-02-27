import {combineReducers} from 'redux';
import {loginReducer} from './loginReducer';
import {courseReducer} from './courseReducer';
import {buildingRoomReducer} from './buildingRoomReducer';
import {postCourseReducer} from './postCourseReducer';
import {deleteCourseReducer} from './deleteCourseReducer';
import {deleteClassReducer} from './deleteClassReducer';
import {editCourseReducer} from './editCourseReducer';
import {getClassReducer} from './getClassReducer';
import {postClassReducer} from './postClassReducer';
import {editClassReducer} from './editClassReducer';

const allReducers = combineReducers({
  loginReducer,
  courseReducer,
  buildingRoomReducer,
  postCourseReducer,
  deleteCourseReducer,
  editCourseReducer,
  getClassReducer,
  postClassReducer,
  editClassReducer,
  deleteClassReducer,
});

export default allReducers;
