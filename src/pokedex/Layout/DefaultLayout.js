import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DefaultLayoutComponent from './DefaultLayoutComponent';

export default withRouter(connect()(DefaultLayoutComponent));
