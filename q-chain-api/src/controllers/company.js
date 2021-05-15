const CrudController = require('./crud');
const {Types: {ObjectId}} = require('mongoose');

const pick = require('lodash/pick');

const {
    CompanyService,
    UserService
} = include('services');

class CompanyController extends CrudController {
    constructor() {
        const service = new CompanyService();
        super(service);
        this.register = this.register.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async register(req, res, next) {
        try {
            const _id = ObjectId();
            
            /**
             * @ Sacar esto!!! por defecto se genera asi
            */
            req.body.ct_id = ObjectId('60957db5d26d7a8692f2f949');
            
            await this._service.saveOne({_id}, req.body);
            req.user  = pick(req.body, [
                'user_mail',
                'user_password',
                'user_name',
                'user_lastname',
                'user_birthday',
                'user_doc_type',
                'user_doc_number'
            ]);
            req.user.company_id = _id;
            next();
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const {
                _id,
                ...props
            } = req.body;
            const result = await this._service.saveOne({_id}, props);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const result = await this._service.deleteOne(req.body);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new CompanyController();
