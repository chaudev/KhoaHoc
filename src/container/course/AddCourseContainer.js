import React from 'react';
import {connect} from 'react-redux';
import AddCourse from '../../components/course/AddCourse';
import {
  getBuildingRoomAction,
  postCourseAction,
} from '../../redux/actions/index';

class AddCourseContainer extends React.Component {
  render() {
    return <AddCourse {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildingRoomAction: () => {
      dispatch(getBuildingRoomAction());
    },
    postCourseAction: (
      courseName,
      trainer,
      startedDate,
      endedDate,
      buildingId,
      roomId,
    ) => {
      dispatch(
        postCourseAction(
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

    data_postCourse: state.postCourseReducer.data,
    message_postCourse: state.postCourseReducer.message,
    fetching_postCourse: state.postCourseReducer.fetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourseContainer);
