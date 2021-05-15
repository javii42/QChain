if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    module.exports = require('./reactotron');
} else {
    module.exports = {
        reactotronEnhancer: {},
        sagaMonitor: {}
    };
}
