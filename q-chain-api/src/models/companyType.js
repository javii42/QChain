const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const CompanyType = new Schema({
    ct_id: ObjectId,
    ct_desc: {
        type: String,
        required: true
    },
    ct_need_hi: {
        type: Boolean,
        required: true
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
    collection: 'companyType',
    timestamps: true
});

module.exports = mongoose.model('CompanyType', CompanyType);
