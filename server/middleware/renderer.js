import * as R from 'ramda';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable';
import {matchRoutes} from "react-router-config";
import NodeCache from "node-cache";
import {routes} from "../../src/routes/routes";
import {Provider as ReduxProvider} from 'react-redux'
import {StaticRouter} from 'react-router';
import {Helmet} from 'react-helmet';

// import our main App component
import App from '../../src/App/App';
import {getBundles} from 'react-loadable/webpack';
import stats from '../../build/react-loadable.json';


const path = require("path");
const fs = require("fs");

const cache = new NodeCache();


export default (store) => (req, res, next) => {
    // get the html file created with the create-react-App build
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {

        if (err) {
            console.error('err', err);
            return res.status(404).end();
        }

        let modules = [];
        const routerContext = {};
        const comps = matchRoutes(routes, req.baseUrl);
        const matchedRoute = R.path(['0', 'route'], comps);
        const cachedData = cache.get(req.originalUrl);
        if (cachedData) {
            return res.send(cachedData);
        }
        let loadedComponents = Promise.all(comps.map(comp => comp.route.component.preload ? comp.route.component.preload() : Promise.resolve(comp.route.component)));
        loadedComponents.then(components => {
            //fetch data
            let comps = components.map(x => x.default ? x.default : x).filter(x => x.getData);
            const appData = Promise.all([App.getData(store), ...comps.map(comp => comp.getData(store, req))]);
            appData.then(() => {
                const html = ReactDOMServer.renderToString(
                    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                        <ReduxProvider store={store}>
                            <StaticRouter location={req.baseUrl} context={routerContext}>
                                <App/>
                            </StaticRouter>
                        </ReduxProvider>
                    </Loadable.Capture>
                );

                // get the stringified state
                const reduxState = JSON.stringify(store.getState());

                let bundles = getBundles(stats, modules);
                let styles = bundles.filter(bundle => bundle && bundle.file.endsWith('.css'))
                    .map(css => `<link rel="stylesheet" href="/${css.file}" />`)
                    .join('\n');
                let scripts = bundles.filter(bundle => bundle && bundle.file.endsWith('.js'))
                    .map(script => `<script src="/${script.file}"></script>`)
                    .join('\n');

                // get HTML headers
                const helmet = Helmet.renderStatic();

                let modifiedHtmlData = htmlData
                // write the React App
                    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                    .replace('<title></title>', helmet.title.toString() + helmet.meta.toString() + helmet.link.toString())
                    // write the string version of our state
                    .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
                    .replace('</head>', styles + '</head>')
                    .replace('</body>', scripts + '</body>');
                // write the HTML header tags


                // now inject the rendered App into our html and send it to the client
                if (matchedRoute && matchedRoute.cache) {
                    cache.set(req.originalUrl, modifiedHtmlData, matchedRoute.cache.ttl);
                }
                return res.send(modifiedHtmlData);
            })
            // render the App as a string

        });

    });
}
