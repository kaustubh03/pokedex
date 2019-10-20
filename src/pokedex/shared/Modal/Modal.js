import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';
import cx from '../../utils/classNames';
import { disableBodyScrolling, bodyHack } from '../../utils/domUtils';
// import crossIcon from '../../public/images/crossIcon.svg';

export default class Modal extends React.PureComponent {
  componentDidMount() {
    this.props.path &&
      this.props.history &&
      this.props.history.push(this.props.path);
    disableBodyScrolling(true);
    window.setTimeout(() => {
      bodyHack(true);
    }, 1000);
  }

  componentWillUnmount() {
    disableBodyScrolling(false);
    bodyHack(false);
    window.setTimeout(() => {
      bodyHack(false);
    }, 1000);
  }

  render() {
    const {
      children,
      fullHeight,
      onCloseHandler,
      showBackButton,
      showCloseButton,
      fixCloseIcon,
      disableOuterClick,
      classNamesStr
    } = this.props;
    const catClassNamesStr = classNamesStr
      ? `${classNamesStr}`
      : `${s.content}`;
    return (
      <div className={s.modal}>
        <div
          className={s.backdrop}
          onClick={() => {
            !disableOuterClick && onCloseHandler();
          }}
        />
        <div
          className={cx(`${catClassNamesStr}`, { [s.fullHeight]: fullHeight })}
        >
          {showCloseButton && (
            <i
              className={cx('cross', s.closeIcon, {
                [s.fixCloseIcon]: fixCloseIcon
              })}
              onClick={onCloseHandler}
            ></i>
          )}
          {showBackButton && (
            <i
              className={cx('backArrow', s.backArrowIcon)}
              onClick={onCloseHandler}
            >
              <span className="path1" />
              <span className="path2" />
            </i>
          )}
          {children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  fullHeight: PropTypes.bool,
  showBackButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  disableOuterClick: PropTypes.bool,
  path: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

Modal.defaultProps = {
  classNamesStr: '',
  fullHeight: false,
  showBackButton: false,
  showCloseButton: false,
  disableOuterClick: false,
  onCloseHandler: () => {}
};
