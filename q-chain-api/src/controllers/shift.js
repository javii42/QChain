const CrudController = require('./crud');

const {Types: {ObjectId}} = require('mongoose');
const { set, get } = require('lodash');

const {
    ShiftService
} = include('services');

const { 
    ShiftState,
} = include('models');
class ShiftController extends CrudController {
    constructor() {
        const service = new ShiftService();
        super(service);
        this.register = this.register.bind(this);
        this.update = this.update.bind(this);
        this.decryptBlockchainData = this.decryptBlockchainData.bind(this);
    }

    async register(req, res, next) {
        try {
            const _id = ObjectId();
            if(!get(req.body, 'ss_id')) {
                let defaultStatus = await ShiftState.findOne({ss_name: 'Pending'}).lean().exec();
                console.log('defaultStatus', defaultStatus);
                defaultStatus = get(defaultStatus, '_id');
                set(req.body, 'ss_id', defaultStatus);
            }
            const result = await this._service.saveOne({_id}, req.body);
            if(get(result, 'id')) {
                const blockchainData = await this._service.generateBlockchainData(req.body);
                await this._service.saveBlockChainData(blockchainData);
            }
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
            await this._service.saveOne({_id}, props);
            //const blockchainData = await this._service.generateBlockchainData(req.body);
            //console.log('blockchainData', blockchainData);
            res.send(await this._service.fetch({}));
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
