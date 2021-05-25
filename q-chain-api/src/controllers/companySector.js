const CrudController = require('./crud');

const {Types: {ObjectId}} = require('mongoose');

const {
    CompanySectorService
} = include('services');

class CompanySectorController extends CrudController {
    constructor() {
        const service = new CompanySectorService();
        super(service);
        this.register = this.register.bind(this);
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
}

module.exports = new CompanySectorController();
