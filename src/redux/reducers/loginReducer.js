import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: new Object(null),
      });
    case POST_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    case POST_LOGIN_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    default:
      return state;
  }
};
