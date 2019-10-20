import 'react-app-polyfill/ie9';
import './blobPolyfill';
// Polyfill For URL
import './urlPolyfill';

import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
// import registerServiceWorker from './serviceWorker/registerServiceWorker';
import { getModuleName } from './moduleSwitching';

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;

window.onload = () => {
  Loadable.preloadReady().then(() => {
    renderMethod(getModuleName(), document.getElementById('root'));
  });
};

//registerServiceWorker();
