import {
  POST_LOGIN,
  GET_COURSE,
  GET_BUILDING_ROOM,
  POST_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
  GET_CLASS,
  POST_CLASS,
  EDIT_CLASS,
  DELETE_CLASS,
} from './actionTypes';

// lOGIN
export const loginAction = (user, pass) => {
  return {
    type: POST_LOGIN,
    data: {user, pass},
  };
};

// DELETE COURSE
export const deleteCourseAction = (course_id) => {
  return {
    type: DELETE_COURSE,
    data: {course_id},
  };
};

// DELETE CLASS
export const deleteClassAction = (classId) => {
  return {
    type: DELETE_CLASS,
    data: {classId},
  };
};

// ADD COURSE
export const postCourseAction = (
  courseName,
  trainer,
  startedDate,
  endedDate,
  buildingId,
  roomId,
) => {
  return {
    type: POST_COURSE,
    data: {courseName, trainer, startedDate, endedDate, buildingId, roomId},
  };
};

// ADD CLASS
export const postClassAction = (
  courseId,
  className,
  trainer,
  date,
  startedTime,
  endedTime,
  buildingId,
  roomId,
) => {
  return {
    type: POST_CLASS,
    data: {
      courseId,
      className,
      trainer,
      date,
      startedTime,
      endedTime,
      buildingId,
      roomId,
    },
  };
};

// EDIT COURSE
export const editCourseAction = (
  courseId,
  courseName,
  trainer,
  startedDate,
  endedDate,
  buildingId,
  roomId,
) => {
  return {
    type: EDIT_COURSE,
    data: {
      courseId,
      courseName,
      trainer,
      startedDate,
      endedDate,
      buildingId,
      roomId,
    },
  };
};

// EDIT CLASS
export const editClassAction = (
  classId,
  className,
  trainer,
  date,
  startedTime,
  endedTime,
  buildingId,
  roomId,
) => {
  return {
    type: EDIT_CLASS,
    data: {
      classId,
      className,
      trainer,
      date,
      startedTime,
      endedTime,
      buildingId,
      roomId,
    },
  };
};

// GET COURSE
export const getCourseAction = () => {
  return {
    type: GET_COURSE,
  };
};

// GET CLASS
export const getClassAction = (course_id) => {
  return {
    type: GET_CLASS,
    data: {course_id},
  };
};

// GET BUILDING + ROOM
export const getBuildingRoomAction = () => {
  return {
    type: GET_BUILDING_ROOM,
  };
};
