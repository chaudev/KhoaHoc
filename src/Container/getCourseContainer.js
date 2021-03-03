import React from 'react';
import {getBuildingRoomAction, getCourseAction} from '../redux/actions/index';
import {deleteCourseAction} from '../redux/actions/index';
import {connect} from 'react-redux';
import QLKhoaHocComp from '../Components/CourseManage';

class getCourseContainer extends React.Component {
  render() {
    console.log(
      '\n-----------------------------------------getCourseContainer-------------------------',
    );
    return <QLKhoaHocComp {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourseAction: () => {
      dispatch(getCourseAction());
    },
    deleteCourseAction: (course_id) => {
      dispatch(deleteCourseAction(course_id));
    },
    getBuildingRoomAction: () => {
      dispatch(getBuildingRoomAction());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dataBuilding: state.buildingRoomReducer.data,
    messageBuilding: state.buildingRoomReducer.message,
    fetchingBuilding: state.buildingRoomReducer.fetching,

    data: state.courseReducer.data,
    message: state.courseReducer.message,
    fetching: state.courseReducer.fetching,

    dataDelete: state.deleteCourseReducer.data,
    fetching_delete: state.deleteCourseReducer.fetching,
    message_delete: state.deleteCourseReducer.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(getCourseContainer);
