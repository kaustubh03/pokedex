import express from 'express';
import Loadable from 'react-loadable';
import proc from 'ptmproc';
import indexController from './controllers/index';

const PORT = 8953;

// initialize the application and create the routes
const app = express();
app.use(indexController);
proc.init(app);

// start the App
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }

        console.log("listening on " + PORT + "...");
    });
});
