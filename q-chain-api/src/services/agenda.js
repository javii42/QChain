const { Agenda } = include('models');
const CrudService = require('./crud');

class AgendaService extends CrudService {
    constructor() {
        super(Agenda);
    }
}

module.exports = AgendaService;
