import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ErrorRetry from './ErrorRetry';
import { bindActionCreators } from 'redux';
import { clearError, retryRequest } from './actions';

const mapStateToProps = state => {
  return {
    ...state.errorReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearError,
      retryRequest
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorRetry)
);
