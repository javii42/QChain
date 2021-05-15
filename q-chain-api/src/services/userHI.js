const { userHI } = include('models');
const CrudService = require('./crud');

class userHIService extends CrudService {
    constructor() {
        super(userHI);
    }
}

module.exports = userHIService;
