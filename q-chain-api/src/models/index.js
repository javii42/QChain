const fs = require('fs');
const path = require('path');

const endsWith = require('lodash/endsWith');
const filter = require('lodash/filter');
const get = require('lodash/get');
const has = require('lodash/has');
const includes = require('lodash/includes');
const last = require('lodash/last');
const map = require('lodash/map');
const reduce = require('lodash/reduce');
const replace = require('lodash/replace');
const set = require('lodash/set');
const startsWith = require('lodash/startsWith');
const split = require('lodash/split');
const upperFirst = require('lodash/upperFirst');

const {
    MONGO_URL,
    DB_CONFIG,
    DB_DRIVER
} = process.env;

const getModelFiles = dir => map(
    filter(
        fs.readdirSync(dir),
        file =>
            !startsWith(file, '.') && endsWith(file, '.js') && file !== 'index.js'
    ),
    file => path.join(dir, file)
);

const transformModelName = (model, filename) => {
    if (has(model, 'modelName')) {
        return get(model, 'modelName');
    }
    let lastFile;

    if (includes(filename, '\\')) {
        lastFile = last(split(filename, '\\'));
    } else {
        lastFile = last(split(filename, '/'));
    }
    return get(model, 'name', upperFirst(replace(lastFile, '.js', '')));
};

const files = getModelFiles(__dirname);

const models = reduce(
    files,
    (modelsObj, filename) => {
        if (!includes(filename, 'index.js')) {
            let model;
            if (MONGO_URL) {
                model = require(filename);
            }

            if (model) {
                const modelName = transformModelName(model, filename);
                set(modelsObj, modelName, model);
            }
        }
        return modelsObj;
    }, {}
);

module.exports = models;
