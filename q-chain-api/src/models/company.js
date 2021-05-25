const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const Company = new Schema({
    _id: ObjectId,
    ct_id: {
        type: ObjectId,
        required: true,
        ref: 'companyType'
    },
    company_name: {
        type: String,
        required: true
    },
    company_mail: {
        type: String,
        required: true
    },
    company_doc_type: {
        type: String,
        required: true
    },
    company_doc_number: {
        type: String,
        required: true
    },
    company_save_blockchain: {
        type: Boolean,
        default: false
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
    collection: 'company',
    timestamps: true
});

module.exports = mongoose.model('Company', Company);
