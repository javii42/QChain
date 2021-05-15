const { HealthInsurance } = include('models');
const CrudService = require('./crud');

class HealthInsuranceService extends CrudService {
    constructor() {
        super(HealthInsurance);
    }
}

module.exports = HealthInsuranceService;
