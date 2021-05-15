const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const UserAccess = new Schema({
    access_id: ObjectId,
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    access_dateHour: {
        type: Date
    },
    login: {
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
    collection: 'userAccess',
    timestamps: true
});

module.exports = mongoose.model('UserAccess', UserAccess);
