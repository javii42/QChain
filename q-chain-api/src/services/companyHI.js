const { CompanyHI } = include('models');
const CrudService = require('./crud');

class CompanyHIService extends CrudService {
    constructor() {
        super(CompanyHI);
    }
}

module.exports = CompanyHIService;
