const loadConfig = () => cb => {
    // eslint-disable-next-line global-require
    require('dotenv').config({path: '.env'});
    cb();
};

const loadEnvConfig = loadConfig();
loadEnvConfig.displayName = 'load ENV config';

exports.loadEnvConfig = loadEnvConfig;
