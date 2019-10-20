import React from 'react';
import Modal from '../../shared/Modal';
import s from './ErrorRetry.module.scss';
import no_network from '../../public/images/banner.png';
import constants from './localization';

export default class ErrorRetry extends React.PureComponent {
  retryRequest = () => {
    this.props.error.forEach((error, index) => {
      this.props.clearError(index);
      this.props.retryRequest(error.types, error.url, error.params);
    });
    this.props.history.push(this.props.location.pathname);
  };
  retryAction = () => {
    window.history.go(-1);
    this.props.retryAction();
    return false;
  };
  render() {
    if (!this.props.error.length) {
      return <img className="hide" src={no_network} alt="No network" />;
    }
    return (
      <Modal fullHeight path="#noNetwork">
        <div className={s.offlineScreen}>
          {this.props.isNetworkErrorType ? (
            <div>
              {' '}
              <img src={no_network} alt="No network" />
              <h3>{constants.NoInternet}</h3>
              <h5>{constants.NoInternetConnectivity}</h5>
              <h5>{constants.tryAgain}</h5>
              <button
                onClick={
                  this.props.retryAction ? this.retryAction : this.retryRequest
                }
              >
                {constants.retry}
              </button>
            </div>
          ) : (
            <div className={s.genericError}>
              <h5>{constants.GenericError}</h5>
              <button
                onClick={
                  this.props.retryAction ? this.retryAction : this.retryRequest
                }
              >
                {constants.retry}
              </button>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}
ErrorRetry.defaultProps = {
  retryAction: null,
  isNetworkErrorType: true
};
