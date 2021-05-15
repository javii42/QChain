/* eslint-disable max-classes-per-file */
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import lowerFirst from 'lodash/lowerFirst';
import replace from 'lodash/replace';
import set from 'lodash/set';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import toUpper from 'lodash/toUpper';
import values from 'lodash/values';

export class Types {
    constructor(entity) {
        set(this, `FETCH_${toUpper(entity)}_REQUESTED`, `FETCH_${toUpper(entity)}_REQUESTED`);
        set(this, `FETCH_${toUpper(entity)}_SUCCEEDED`, `FETCH_${toUpper(entity)}_SUCCEEDED`);
        set(this, `SUBMIT_${toUpper(entity)}_REQUESTED`, `SUBMIT_${toUpper(entity)}_REQUESTED`);
        set(this, `UPDATE_${toUpper(entity)}_FORM`, `UPDATE_${toUpper(entity)}_FORM`);
    }

    static get(type) {
        return this[type];
    }
}

export class Actions {
    constructor(entity) {
        const crudTypes = new Types(entity);
        forEach(values(crudTypes), type => {
            const name = replace(lowerFirst(startCase(toLower(type))), /\s/g, '');
            if (includes(type, `FETCH_${toUpper(entity)}_REQUESTED`) || includes(type, 'DELETE')) {
                set(this, name, id => ({type, id}));
            } else if (includes(type, `FETCH_${toUpper(entity)}S_REQUESTED`)) {
                set(this, name, filters => ({type, filters}));
            } else {
                set(this, name, props => ({type, ...props}));
            }
        });
    }
}
