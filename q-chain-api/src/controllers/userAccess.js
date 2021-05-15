const CrudController = require('./crud');

const {
    UserAccessService
} = include('services');

class UserAccessController extends CrudController {
    constructor() {
        const service = new UserAccessService();
        super(service);
    }
}

module.exports = new UserAccessController();
