import {
  POST_COURSE,
  POST_COURSE_SUCCESS,
  POST_COURSE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const postCourseReducer = (state = initialState, action) => {

  switch (action.type) {
    case POST_COURSE:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: new Object(null),
      });
    case POST_COURSE_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    case POST_COURSE_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    default:
      return state;
  }
};
