import React from 'react';
import DotLoader from '../shared/DotLoader';

export default class AppIndex extends React.Component {
  state = {
    renderComponent: null
  };

  componentDidMount() {
    if (this.props.feature === 'pokedex') {
      import(/* webpackChunkName: "pokedex_app" */ './App').then(
        response => {
          this.setState({
            renderComponent: response.default
          });
        }
      );
    }
  }

  render() {
    if (this.state.renderComponent) return <this.state.renderComponent />;
    return <DotLoader />;
  }
}
