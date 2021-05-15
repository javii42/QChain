const { Router } = require('express');
const get = require('lodash/get');
const {
    authenticate, errorHandler
} = require('./middleWares');

const { StatusController } = include('controllers');
const Logger = include('helpers/logger');

const localRoute = route => {
    route.get('/ping', StatusController.ping);
    route.get('/ready', StatusController.getStatus);
    route.get('/health', StatusController.getHealth);
    route.get('/swagger', (_, res) =>
        res.send(get(include('openapi'), 'components'))
    );
    return route;
};

class Routes {
    static configure(app) {
        app.use('/', localRoute(Router()));
        app.use('/api', /*authenticate,*/ require('./api')(Router()));
        Logger.info('Loading public-api...');
        app.use('/public-api', require('./public-api')(Router()));
        app.use(errorHandler);
    }
}

module.exports = Routes;
