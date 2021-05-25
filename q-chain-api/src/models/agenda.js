const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const Agenda = new Schema({
    agenda_id: ObjectId,
    ce_id: {
        type: ObjectId,
        required: true,
        ref: 'companyEmployee'
    },
    branch_id: {
        type: ObjectId,
        required: true,
        ref: 'branch'
    },
    agenda_day_week: {
        type: Number
    },
    agenda_date: {
        type: Date
    },
    agenda_open: {
        type: Boolean,
        default: true
    },
    agenda_opening: {
        type: Date
    },
    agenda_closing: {
        type: Date
    },
    agenda_q_shifts: {
        type: Number
    }, 
    agenda_sim_shifts: {
        type: Number
    },
    agenda_shift_duration: {
        type: Date
    }
}, {
    collection: 'agenda',
    timestamps: true
});

module.exports = mongoose.model('Agenda', Agenda);
