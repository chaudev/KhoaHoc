import {
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_ERROR,
  EDIT_CLASS
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const editClassReducer = (state = initialState, action) => {

  switch (action.type) {
    case EDIT_CLASS:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: new Object(null),
      });
    case EDIT_CLASS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    case EDIT_CLASS_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action.data,
      });
    default:
      return state;
  }
};
