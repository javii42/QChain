const { BranchAddress } = include('models');
const CrudService = require('./crud');

class BranchAddressService extends CrudService {
    constructor() {
        super(BranchAddress);
    }
}

module.exports = BranchAddressService;
