const CrudController = require('./crud');

const {
    CompanyHIService
} = include('services');

class CompanyHIController extends CrudController {
    constructor() {
        const service = new CompanyHIService();
        super(service);
    }
}

module.exports = new CompanyHIController();
