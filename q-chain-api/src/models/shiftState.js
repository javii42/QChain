const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const ShiftState = new Schema({
    ss_id: ObjectId,
    ss_name: {
        type: String
    },
}, {
    collection: 'shiftState',
    timestamps: true
});

module.exports = mongoose.model('ShiftState', ShiftState);
