const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const Shift = new Schema({
    shift_id: ObjectId,
    branch_id: {
        type: ObjectId,
        required: true,
        ref: 'branch'
    },
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    user_data: {
        type: String
    },
    company_name: {
        type: String
    },
    employee_name: {
        type: String
    },
    ce_id: {
        type: ObjectId,
        required: true,
        ref: 'companyEmployee'
    },
    ss_id: {
        type: ObjectId,
        required: true,
        ref: 'shiftState'
    },
    shift_call: {
        type: Number
    },
    shift_duration: {
        type: Date
    },
    shift_date: {
        type: Date
    },
    shift_start: {
        type: Date
    },
    shift_comment: {
        type: String
    },
    shift_status: {
        type: String
    },
    shift_address: {
        type: String
    }
}, {
    collection: 'shift',
    timestamps: true
});

module.exports = mongoose.model('Shift', Shift);
