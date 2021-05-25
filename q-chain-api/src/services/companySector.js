const { CompanySector } = include('models');
const CrudService = require('./crud');

class CompanySectorService extends CrudService {
    constructor() {
        super(CompanySector);
    }
}

module.exports = CompanySectorService;
