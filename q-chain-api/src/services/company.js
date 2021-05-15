const { Company } = include('models');
const CrudService = require('./crud');

class CompanyService extends CrudService {
    constructor() {
        super(Company);
    }
}

module.exports = CompanyService;
