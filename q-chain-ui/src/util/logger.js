/* global window ENDPOINT */
import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

const customJSON = logData => ({
    msg: logData.message,
    level: logData.level.label,
    stacktrace: logData.stacktrace
});

remote.apply(log, {
    headers: {
        referrer: ENDPOINT,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
    },
    format: customJSON,
    url: `${ENDPOINT}api/logger`,
    level: 'error'
});

log.enableAll();

export default log;
