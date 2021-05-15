const { Rol } = include('models');
const CrudService = require('./crud');

class RolService extends CrudService {
    constructor() {
        super(Rol);
    }
}

module.exports = RolService;
