import concat from 'lodash/concat';
import document from 'arg.js/src/document';
import isEqual from 'lodash/isEqual';
import isDate from 'lodash/isDate';
import inRange from 'lodash/inRange';
import size from 'lodash/size';
import range from 'lodash/range';
import rangeRight from 'lodash/rangeRight';
import floor from 'lodash/floor';
import toNumber from 'lodash/toNumber';
import map from 'lodash/map';
import get from 'lodash/get';

// eslint-disable-next-line max-len
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /[0-9]+/;
const passwordRegex = /^(?=.*[A-Z]{1,})(?=.*[0-9]{2,})(?=.*[a-z]{3,}).{8,}$/;

export default class ValidatorService {
    static validateText(input, max = 50, min = 2) {
        return inRange(size(input), min, max);
    }

    static validateNumber(input) {
        return numberRegex.test(input.toString());
    }

    static validateDate(input) {
        if (isDate(input)) {
            return true;
        }
        return !!(new Date(input)).getTime();
    }

    static validateEmail(email) {
        return emailRegex.test(email);
    }

    static validateDocument(input) {
        return input && document.isValidDni(input);
    }

    static validateCuit(cuit) {
        if (size(cuit) === 11) {
            const base = concat(rangeRight(2, 6), range(7, 5), rangeRight(2, 6));
            const cuitToArray = map(cuit, n => toNumber(n));
            const lastDigit = cuitToArray.pop();
            let result = 0;
            map(cuitToArray, (cta, index) => {
                result += cta * get(base, index);
            });
            result = 11 - (result - (floor(result / 11) * 11));
            if (result === 11) {
                result = 0;
            }
            if (result === 10) {
                result = 9;
            }
            return result === lastDigit;
        }
        return false;
    }

    static validatePassword(input) {
        return passwordRegex.test(input);
    }

    static validateUrl(value) {
        return urlRegexp.test(value);
    }

    static validateCompare(input, compareInput, max = 50, min = 2) {
        return inRange(size(input), min, max) && isEqual(input, compareInput);
    }
}
