const { ShiftTracking } = include('models');
const CrudService = require('./crud');

class ShiftTrackingService extends CrudService {
    constructor() {
        super(ShiftTracking);
    }
}

module.exports = ShiftTrackingService;
