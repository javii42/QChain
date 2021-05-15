const CrudController = require('./crud');

const {
    UserHIService
} = include('services');

class UserHIController extends CrudController {
    constructor() {
        const service = new UserHIService();
        super(service);
    }
}

module.exports = new UserHIController();
