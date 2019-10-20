import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { onRouteChangeEvent } from './onRoutesChange';
import { getPathByName } from './routerManager';
import RouteHandlingComponent from '../components/RouteHandling';
import LazyloadComponent from './LazyloadComponent';
import AsyncPageNotFound from '../components/PageNotFound';


const AsyncHome = import(
  /* webpackChunkName: "pokedex_home" */ '../components/Home/HomeContainer'
);
const AsyncPokemonDetail = import(
  /* webpackChunkName: "pokedex_home" */ "../components/PokemonDetail/PokemonDetailContainer"
);

const RouteHandling = {
  path: getPathByName('routeHandling'),
  component: RouteHandlingComponent,
  exact: true
};

export const routes = [
  {
    path: getPathByName('home'),
    component: AsyncHome,
    exact: true
  },
  {
    path: getPathByName('pokemondetail'),
    component: AsyncPokemonDetail,
    exact: true
  },
];

class Router extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      onRouteChangeEvent('data from route changes');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path={RouteHandling.path}
            component={RouteHandling.component}
            exact={RouteHandling.exact}
          />

          {routes.map((r, i) => {
            return (
              <Route
                path={r.path}
                render={props => (
                  <LazyloadComponent component={r.component} {...props} />
                )}
                key={i}
                exact
              />
            );
          })}
          <Route component={AsyncPageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(Router);
