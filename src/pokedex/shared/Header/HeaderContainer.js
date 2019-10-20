import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';

export default withRouter(connect()(Header));
