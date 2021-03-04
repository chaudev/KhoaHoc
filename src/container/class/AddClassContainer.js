import React from 'react';
import {connect} from 'react-redux';
import AddClass from '../../components/class/AddClass';
import {
  getBuildingRoomAction,
  postClassAction,
} from '../../redux/actions/index';

class AddClassContainer extends React.Component {
  render() {
    return <AddClass {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildingRoomAction: () => {
      dispatch(getBuildingRoomAction());
    },
    postClassAction: (
      courseId,
      className,
      trainer,
      date,
      startedTime,
      endedTime,
      buildingId,
      roomId,
    ) => {
      dispatch(
        postClassAction(
          courseId,
          className,
          trainer,
          date,
          startedTime,
          endedTime,
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

    dataAdd: state.postClassReducer.data,
    messageAdd: state.postClassReducer.message,
    fetchingAdd: state.postClassReducer.fetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddClassContainer);
