import * as R from 'ramda';

const routes = {
  routeHandling: {
    path: '/',
    name: 'routeHandling'
  },
  home: {
    path: '/home',
    name: 'home'
  },
  pokemondetail: {
    path: '/detail/:id',
    name: 'pokemondetail'
  },
};
export default routes;
export const getPathByKey = key => routes[key].path;
export const getPathByName = name => {
  const findPathByName = R.compose(
    R.prop('path'),
    R.find(R.propEq('name', name)),
    R.values
  );
  return findPathByName(routes);
};
