/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const normalizeRegister = state => {
    const registerFields = get(state, 'register.fields');
    const {
        prefix,
        areaCode,
        number
    } = registerFields;
    if (isEmpty(prefix) && isEmpty(areaCode) && isEmpty(number)) {
        delete registerFields.prefix;
        delete registerFields.areaCode;
        delete registerFields.number;
    }
    return registerFields;
};


export const getFormData = state => ({
    ...normalizeRegister(state),
    segment: get(state, 'geography.fields')
});

export const getZoom = state => get(state, 'register.zoom');
