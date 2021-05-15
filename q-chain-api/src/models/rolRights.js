const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const RolRights = new Schema({
    rr_id: ObjectId,
    rol_id: {
        type: ObjectId,
        required: true,
        ref: 'rol'
    },
    right_id: {
        type: ObjectId,
        required: true,
        ref: 'right'
    },
    rol_right_active: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'rolRights',
    timestamps: true
});

module.exports = mongoose.model('RolRights', RolRights);
