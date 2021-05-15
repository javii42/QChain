const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const UserRol = new Schema({
    ur_id: ObjectId,
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    user_role_id: {
        type: ObjectId,
        required: true,
        ref: 'rol'
    },
    user_rol_active: {
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
    collection: 'userRol',
    timestamps: true
});

module.exports = mongoose.model('UserRol', UserRol);
