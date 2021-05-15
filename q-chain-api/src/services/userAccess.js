const { UserAccess } = include('models');
const CrudService = require('./crud');

class UserAccessService extends CrudService {
    constructor() {
        super(UserAccess);
    }
}

module.exports = UserAccessService;
