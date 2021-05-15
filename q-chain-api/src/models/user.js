const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const User = new Schema({
    _id: ObjectId,
    user_mail: {
        type: String, 
        required: true
    },
    user_password: {
        type: String, 
        required: true
    },
    user_name: {
        type: String, 
        required: true
    },
    user_lastname: {
        type: String, 
        required: true
    },
    user_birthday: {
        type: Date, 
        required: true
    },
    user_doc_type: {
        type: String, 
        required: true
    },
    user_doc_number: {
        type: String, 
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
    collection: 'user',
    timestamps: true
});

module.exports = mongoose.model('User', User);
