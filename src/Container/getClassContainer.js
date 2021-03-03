import React from 'react';
import {getBuildingRoomAction, getClassAction} from '../redux/actions/index';
import {deleteClassAction} from '../redux/actions/index';
import {connect} from 'react-redux';
import ClassManage from '../Components/ClassManage';

class getClassContainer extends React.Component {
  render() {
    console.log(
      '\n-----------------------------------------getClassContainer-------------------------',
    );
    return <ClassManage {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClassAction: (course_id) => {
      dispatch(getClassAction(course_id));
    },
    deleteClassAction: (classId) => {
      dispatch(deleteClassAction(classId));
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

    data: state.getClassReducer.data,
    message: state.getClassReducer.message,
    fetching: state.getClassReducer.fetching,

    dataDelete: state.deleteClassReducer.data,
    fetching_delete: state.deleteClassReducer.fetching,
    message_delete: state.deleteClassReducer.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(getClassContainer);
