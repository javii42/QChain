const { Branch } = include('models');
const CrudService = require('./crud');

class BranchService extends CrudService {
    constructor() {
        super(Branch);
    }
}

module.exports = BranchService;
