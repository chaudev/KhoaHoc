import {
  POST_CLASS,
  POST_CLASS_SUCCESS,
  POST_CLASS_ERROR
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const postClassReducer = (state = initialState, action) => {

  switch (action.type) {
    case POST_CLASS:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: new Object(null),
      });
    case POST_CLASS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    case POST_CLASS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    default:
      return state;
  }
};
