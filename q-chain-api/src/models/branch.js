const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const Branch = new Schema({
    branch_id: ObjectId,
    company_id: {
        type: ObjectId,
        required: true,
        ref: 'company'
    },
    branch_num: {
        type: Number
    },
    branch_name: {
        type: String
    },
    branch_active: {
        type: Boolean,
        default: true
    },
    branch_employees: {
        type: Array,
        default: []
    }
}, {
    collection: 'branch',
    timestamps: true
});

module.exports = mongoose.model('Branch', Branch);
