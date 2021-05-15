const { Right } = include('models');
const CrudService = require('./crud');

class RightService extends CrudService {
    constructor() {
        super(Right);
    }
}

module.exports = RightService;
