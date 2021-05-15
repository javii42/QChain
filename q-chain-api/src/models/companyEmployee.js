const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const CompanyEmployee = new Schema({
    ce_id: ObjectId,
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    company_id: {
        type: ObjectId, 
        required: true,
        ref: 'company'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
    __v: {
        type: Number
    }
}, {
    collection: 'companyEmployee',
    timestamps: true
});

module.exports = mongoose.model('CompanyEmployee', CompanyEmployee);
