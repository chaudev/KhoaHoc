import React from 'react';
import {connect} from 'react-redux';
import EditClass from '../../components/class/EditClass';
import {
  getBuildingRoomAction,
  editClassAction,
} from '../../redux/actions/index';

class EditClassContainer extends React.Component {
  render() {
    return <EditClass {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildingRoomAction: () => {
      dispatch(getBuildingRoomAction());
    },
    editClassAction: (
      classId,
      className,
      trainer,
      date,
      startedTime,
      endedTime,
      buildingId,
      roomId,
    ) => {
      dispatch(
        editClassAction(
          classId,
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

    dataEdit: state.editClassReducer.data,
    messageEdit: state.editClassReducer.message,
    fetchingEdit: state.editClassReducer.fetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditClassContainer);
