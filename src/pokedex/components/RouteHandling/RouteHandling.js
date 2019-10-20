import React from 'react';
import 'url-search-params-polyfill';

export default class RouteHandling extends React.PureComponent {
  getSubPartOfDeeplink = () => {
    //It will return subpart of deeplink which will be needed for further proceeding
    console.log('--2');
    const params = new URLSearchParams(window.location.search);
    const deeplinkUrl = params.get('page');

    return deeplinkUrl;
  };

  movetoLanding = () => {
    this.props.history.push('/home');
  };

  componentDidMount() {
    const pageRoute = this.getSubPartOfDeeplink();
    console.log('pageRoutepageRoute', pageRoute);
    switch (pageRoute) {
      case 'landing':
        return this.movetoLanding();
      default:
        return this.movetoLanding();
    }
  }
  render() {
    return null;
  }
}
