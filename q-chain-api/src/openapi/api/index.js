const user = require('./user');
const company = require('./company');
const companyType = require('./companyType');
const right = require('./right');
const rol = require('./rol');
const healthInsurance = require('./healthInsurance');

module.exports = {
    ...user,
    ...company,
    ...companyType,
    ...right,
    ...rol,
    ...healthInsurance
};
