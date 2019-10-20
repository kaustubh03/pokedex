import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from './Modal';

export default withRouter(connect()(Modal));
