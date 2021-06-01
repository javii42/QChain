const CrudController = require('./crud');

const {Types: {ObjectId}} = require('mongoose');

const {
    ShiftTrackingService
} = include('services');
class ShiftController extends CrudController {
    constructor() {
        const service = new ShiftTrackingService();
        super(service);
        this.register = this.register.bind(this);
        this.update = this.update.bind(this);
        this.decryptBlockchainData = this.decryptBlockchainData.bind(this);
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

            const blockchainData = await this._service.generateBlockchainData(req.body);
            console.log('blockchainData', blockchainData);
            res.send(blockchainData);
        } catch(err) {
            next(err);
        }
    }

    async decryptBlockchainData(req, res, next) {
        try {
            const {
                hash,
                password
            } = req.body;
            const blockchainData = await this._service.decryptBlockchainData(hash, password);
            res.send(blockchainData);
        } catch(err) {
            next(err);
        }
    }

}

module.exports = new ShiftController();
