const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const Rol = new Schema({
    rol_id: ObjectId,
    rol_name: {
        type: String,
        required: true
    },
    rol_description: {
        type: String,
        required: true
    },
    rol_creation_date: {
        type: Date
    },
    rol_deletion_date: {
        type: Date,
        default: null
    },
    rol_active: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'rol',
    timestamps: true
});

module.exports = mongoose.model('Rol', Rol);
