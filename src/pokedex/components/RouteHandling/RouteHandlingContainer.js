import { withRouter } from 'react-router-dom';
import RouteHandling from './RouteHandling';
import { bindActionCreators } from 'redux';
import { saveLeadDataToStore } from './actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    ...state.app
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveLeadDataToStore
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteHandling)
);
