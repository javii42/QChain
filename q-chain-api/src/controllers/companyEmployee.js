const CrudController = require('./crud');
const {Types: {ObjectId}} = require('mongoose');

const pick = require('lodash/pick');

const {
    CompanyEmployeeService
} = include('services');

class CompanyEmployeeController extends CrudController {
    constructor() {
        const service = new CompanyEmployeeService();
        super(service);
        this.register = this.register.bind(this);
    }

    async register(req, res, next) {
        try {
            const _id = ObjectId();
            const fields  = pick(req.result, [
                'user_id',
                'company_id'
            ]);
            const result = await this._service.saveOne({_id}, fields);
            res.send(result);
        } catch(err) {
            console.log('error at companyEmployee controller', err);
            next(err);
        }
    }
}

module.exports = new CompanyEmployeeController();
