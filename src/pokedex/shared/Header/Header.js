import React, { Component } from 'react';
import s from './Header.module.scss';

/* eslint-disable */
export default class Header extends Component {
  handleBackClick = () => {
    return false;  
  };
  moveToProfile = () => {
    // this.props.history.push('/profile');
  };
  render() {
    return (
      <div
        style={{ position: this.props.position }}
        className={`${s.headerWrap} ${
          this.props.isPremium ? s.premium : s.normal
        }`}
      >
        <header
          className={this.props.white ? `${s.white} ${s.header}` : s.header}
        >
          <div className={s.action}>
            <i
              className="gvFontIcons icon-back"
              onClick={this.handleBackClick}
            ></i>
          </div>
          <h1>
            {this.props.centerHeader ? (
              <center>{this.props.headerTitle}</center>
            ) : (
              this.props.headerTitle
            )}
          </h1>
          {this.props.headerRightLink && (
            <div className={s.link}>
              <span onClick={this.props.handleLinkAction}>
                {this.props.headerRightLink}
              </span>
            </div>
          )}
          {this.props.headerRightDots && (
            <div className={s.action}>
              <i className="more" onClick={this.props.handleDotsAction}></i>
            </div>
          )}
          {this.props.headerRightLogo && (
            <div
              className={`${s.action} ${s.noPadding} `}
              onClick={this.moveToProfile}
            >
              <img src={this.props.headerRightLogo} alt="" />
              {this.props.isPremium && (
                <span className={s.premiumTag}>PREMIUM</span>
              )}
            </div>
          )}
          {this.props.headerRightText && (
            <div className={s.text}>
              <span>{this.props.headerRightText}</span>
            </div>
          )}
        </header>
        {this.props.headerChildren}
      </div>
    );
  }
}

Header.defaultProps = {
  headerTitle: null,
  headerRightLogo: null,
  headerRightDots: null,
  headerRightLink: null,
  headerBackClick: null,
  headerRightText: null,
  white: false,
  centerHeader: false
};
