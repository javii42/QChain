const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const CompanyHI = new Schema({
    ch_id: ObjectId,
    company_id: {
        type: ObjectId,
        required: true,
        ref: 'company'
    },
    hi_id: {
        type: ObjectId,
        required: true,
        ref: 'healthInsurance'
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
    collection: 'companyHI',
    timestamps: true
});

module.exports = mongoose.model('CompanyHI', CompanyHI);
