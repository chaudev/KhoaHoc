import React from 'react';
import LoginComponent from '../Components/Login';
import {loginAction} from '../redux/actions/index';
import {connect} from 'react-redux';

class LoginContainer extends React.Component {
  render() {
    console.log(
      '\n-----------------------------------------LoginContainer-------------------------',
    );
    return <LoginComponent {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (user, pass) => {
      dispatch(loginAction(user, pass));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.loginReducer.data,
    message: state.loginReducer.message,
    fetching: state.loginReducer.fetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
