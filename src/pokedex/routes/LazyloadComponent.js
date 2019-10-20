import React from 'react';
import DotLoader from '../shared/DotLoader';
import s from './LazyloadComponent.module.scss';

export default class LazyloadComponent extends React.PureComponent {
  state = {
    renderComponent: null
  };

  componentDidMount() {
    this.props.component.then(response => {
      this.setState({
        renderComponent: response.default
      });
    });
  }

  render() {
    if (this.state.renderComponent) {
      return <this.state.renderComponent {...this.props} />;
    }
    return (
      <div className={s.loaderContainer}>
        <DotLoader />
      </div>
    );
  }
}
