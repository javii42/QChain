const { ShiftState } = include('models');
const CrudService = require('./crud');

class ShiftStateService extends CrudService {
    constructor() {
        super(ShiftState);
    }
}

module.exports = ShiftStateService;
