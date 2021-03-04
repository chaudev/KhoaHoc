import React from 'react';
import {connect} from 'react-redux';
import EditCourse from '../../components/course/EditCourse';
import {
  getBuildingRoomAction,
  editCourseAction,
} from '../../redux/actions/index';

class EditCourseContainer extends React.Component {
  render() {
    return <EditCourse {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildingRoomAction: () => {
      dispatch(getBuildingRoomAction());
    },
    editCourseAction: (
      courseId,
      courseName,
      trainer,
      startedDate,
      endedDate,
      buildingId,
      roomId,
    ) => {
      dispatch(
        editCourseAction(
          courseId,
          courseName,
          trainer,
          startedDate,
          endedDate,
          buildingId,
          roomId,
        ),
      );
    },
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.buildingRoomReducer.data,
    message: state.buildingRoomReducer.message,
    fetching: state.buildingRoomReducer.fetching,

    dataEdit: state.editCourseReducer.data,
    messageEdit: state.editCourseReducer.message,
    fetchingEdit: state.editCourseReducer.fetching,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCourseContainer);
