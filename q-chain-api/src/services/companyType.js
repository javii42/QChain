const { CompanyType } = include('models');
const CrudService = require('./crud');

class CompanyTypeService extends CrudService {
    constructor() {
        super(CompanyType);
    }
}

module.exports = CompanyTypeService;
