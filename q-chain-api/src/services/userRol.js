const { UserRol } = include('models');
const CrudService = require('./crud');

class UserRolService extends CrudService {
    constructor() {
        super(UserRol);
    }
}

module.exports = UserRolService;
