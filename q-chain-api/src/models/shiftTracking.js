const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const ShiftTracking = new Schema({
    st_id: ObjectId,
    shift_id: {
        type: ObjectId,
        required: true,
        ref: 'shift'
    },
    st_hour: {
        type: Date
    },
    st_previous_state: {
        type: String
    },
    st_new_state: {
        type: String
    },
    st_user: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
}, {
    collection: 'shiftTracking',
    timestamps: true
});

module.exports = mongoose.model('ShiftTracking', ShiftTracking);
