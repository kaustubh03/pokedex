// React Imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import Router from '../routes/routes';
import ErrorRetry from './ErrorRetry';

// Redux Imports
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Stylesheet Imports
import '../commonstyles/common.scss';


class App extends React.Component {
  componentDidMount() {
    //
  }
  componentDidUpdate(prevProps) {}
  render() {
    return (
      <div className="App">
        <Router />
        <ErrorRetry />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
