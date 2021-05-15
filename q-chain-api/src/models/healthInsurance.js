const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const HealthInsurance = new Schema({
    hi_id: ObjectId,
    hi_desc: {
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
    collection: 'healthInsurance',
    timestamps: true
});

module.exports = mongoose.model('HealthInsurance', HealthInsurance);
