const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const Right = new Schema({
    right_id: ObjectId,
    right_name: {
        type: String,
        required: true
    },
    right_desc: {
        type: String,
        required: true
    },
    right_active: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'right',
    timestamps: true
});

module.exports = mongoose.model('Right', Right);
