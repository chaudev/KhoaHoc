import {
  DELETE_COURSE_ERROR,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const deleteCourseReducer = (state = initialState, action) => {

  switch (action.type) {
    case DELETE_COURSE:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: action,
      });
    case DELETE_COURSE_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    case DELETE_COURSE_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    default:
      return state;
  }
};
