const { RolRights } = include('models');
const CrudService = require('./crud');

class RolRightsService extends CrudService {
    constructor() {
        super(RolRights);
    }
}

module.exports = RolRightsService;
