import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loadable from "react-loadable";
import Header from '../shared/Header';
// import Footer from '../components/Footer/FooterContainer';

class DefaultLayoutComponent extends Component {
  sectionClass = () => {
    if (this.props.position === 'fixed') {
      if (this.props.showTab) {
        return 'midleConTab';
      }
      return 'midleCon';
    } else {
      return '';
    }
  };

  render() {
    return (
      <main>
        <section className={this.sectionClass()}>
          <Header {...this.props} />
          {this.props.children}
          {/* {footer && <Footer />} */}
        </section>
      </main>
    );
  }
}

DefaultLayoutComponent.propTypes = {
  header: PropTypes.bool
  // footer: PropTypes.bool
};
DefaultLayoutComponent.defaultProps = {
  header: true,
  footer: false,
  position: 'fixed',
  isPremium: false
};

export default DefaultLayoutComponent;
