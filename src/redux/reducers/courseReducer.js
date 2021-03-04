import {
  GET_COURSE,
  GET_COURSE_ERROR,
  GET_COURSE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const courseReducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case GET_COURSE:
        return Object.assign({}, state, {
          fetching: true,
          message: null,
          data: new Object(null),
        });
      case GET_COURSE_SUCCESS:
        return Object.assign({}, state, {
          fetching: false,
          message: action.message,
          data: action,
        });
      case GET_COURSE_ERROR:
        return Object.assign({}, state, {
          fetching: false,
          message: action.message,
          data: action,
        });
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};
