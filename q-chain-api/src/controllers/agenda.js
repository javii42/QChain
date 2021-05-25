const CrudController = require('./crud');

const {Types: {ObjectId}} = require('mongoose');

const {
    AgendaService
} = include('services');

const isEmpty = require('lodash/isEmpty');
const set = require('lodash/set');
const toString = require('lodash/toString');

const formatData = reqBody => {
    const {
        ce_id,
        branch_id,
        agenda_week_day,
        agenda_date,
        agenda_open,
        agenda_opening,
        agenda_closing,
        agenda_q_shifts,
        agenda_sim_shifts,
        agenda_shift_duration
     } = reqBody;

    const finalObject = {
        agenda_open,
        agenda_opening,
        agenda_closing,
        agenda_q_shifts,
        agenda_sim_shifts,
        agenda_shift_duration
    };

    console.log('reqBody', reqBody, isEmpty(branch_id))

    if(isEmpty(ce_id) && !isEmpty(branch_id)) {
        set(finalObject, 'branch_id', branch_id);
    } else if(!isEmpty(ce_id) && isEmpty(branch_id)) {
        set(finalObject, 'ce_id', ce_id);
    } else {
        return null;
    }
    if(isEmpty(agenda_date) && !isEmpty(toString(agenda_week_day))) {
        set(finalObject, 'agenda_week_day', agenda_week_day);
    } else if(!isEmpty(agenda_date) && isEmpty(toString(agenda_week_day))) {
        set(finalObject, 'agenda_date', agenda_date);
    } else {
        return null;
    }
    return finalObject;
};

class AgendaController extends CrudController {
    constructor() {
        const service = new AgendaService();
        super(service);
        this.register = this.register.bind(this);
    }

    async register(req, res, next) {
        try {
            const _id = ObjectId();
            const finalObject = formatData(req.body);
            if(!finalObject) {
                return res.status(403).send({status: 'ERROR'});
            }
            const result = await this._service.saveOne({_id}, finalObject);
            res.send(result);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new AgendaController();
