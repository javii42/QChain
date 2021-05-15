const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const UserHI = new Schema({
    user_id: ObjectId,
    hi_id: {
        type: ObjectId,
        required: true,
        ref: 'healthInsurance'
    },
    hi_number: {
        type: Number,
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
    collection: 'userHI',
    timestamps: true
});

module.exports = mongoose.model('UserHI', UserHI);
