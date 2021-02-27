import {
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  GET_CLASS
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const getClassReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_CLASS:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: action,
      });
    case GET_CLASS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    case GET_CLASS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    default:
      return state;
  }
};
