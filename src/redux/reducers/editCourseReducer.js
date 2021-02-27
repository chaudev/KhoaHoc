import {
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_ERROR,
  EDIT_COURSE,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const editCourseReducer = (state = initialState, action) => {

  switch (action.type) {
    case EDIT_COURSE:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: new Object(null),
      });
    case EDIT_COURSE_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    case EDIT_COURSE_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    default:
      return state;
  }
};
