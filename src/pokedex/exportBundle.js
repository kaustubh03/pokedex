import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import AppIndex from './components';
import './webfont.font';
/* global BASE_PATH */

const store = configureStore(window.__REDUX_STATE__ || {});

export const PokedexBundle = feature => (
         <ReduxProvider store={store}>
           <BrowserRouter basename={BASE_PATH}>
             <AppIndex feature={feature} />
           </BrowserRouter>
         </ReduxProvider>
       );
