const { CompanyEmployee } = include('models');
const CrudService = require('./crud');

class CompanyEmployeeService extends CrudService {
    constructor() {
        super(CompanyEmployee);
    }
}

module.exports = CompanyEmployeeService;
