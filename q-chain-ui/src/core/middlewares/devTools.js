/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        reactotronEnhancer: null,
        sagaMonitor: null
    };
} else {
    module.exports = require('./reactotron');
}
