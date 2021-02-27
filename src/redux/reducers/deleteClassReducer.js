import {
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR,
  DELETE_CLASS
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const deleteClassReducer = (state = initialState, action) => {

  switch (action.type) {
    case DELETE_CLASS:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: action,
      });
    case DELETE_CLASS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    case DELETE_CLASS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    default:
      return state;
  }
};
