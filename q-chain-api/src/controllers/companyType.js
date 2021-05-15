const CrudController = require('./crud');
const {Types: {ObjectId}} = require('mongoose');

const {
    CompanyTypeService
} = include('services');

class CompanyTypeController extends CrudController {
    constructor() {
        const service = new CompanyTypeService();
        super(service);
        this.register = this.register.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async register(req, res, next) {
        try {
            const _id = ObjectId();
            const result = await this._service.saveOne({_id}, req.body);
            res.send(result);
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

module.exports = new CompanyTypeController();
