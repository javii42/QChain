const {CompanyEmployeeService} = include('services');

const Error = include('helpers/error');
const { validateToken } = include('helpers/jsonWebToken');

const head = require('lodash/head');
const split = require('lodash/split');
const isEqual = require('lodash/isEqual');
const toString = require('lodash/toString');

module.exports = async (req, res, next) => {
    try {
        const header = req.get('Authorization');
        const token = head(split(header, ' ').slice(1));
        const user = await validateToken(token);
        const service = new CompanyEmployeeService();
        const result = await service.fetchOne({user_id: user._id});
        if(result && toString(result.company_id) === req.body.company_id) {
            return next();
        }
        return res.status(403).send(result);
    } catch (err) {
        console.log('err', err);
        return res.sendStatus(Error.UNAUTHORIZED);
    }
};
