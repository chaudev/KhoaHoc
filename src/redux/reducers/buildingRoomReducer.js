import {
  GET_BUILDING_ROOM,
  GET_BUILDING_ROOM_ERROR,
  GET_BUILDING_ROOM_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  data: null,
  message: null,
  fetching: null,
};

export const buildingRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUILDING_ROOM:
      return Object.assign({}, state, {
        fetching: true,
        message: null,
        data: new Object(null),
      });
    case GET_BUILDING_ROOM_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    case GET_BUILDING_ROOM_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        message: action.message,
        data: action,
      });
    default:
      return state;
  }
};
