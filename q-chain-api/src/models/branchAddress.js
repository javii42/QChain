const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const BranchAddress = new Schema({
    ba_id: ObjectId,
    branch_id: {
        type: ObjectId,
        required: true,
        ref: 'branch'
    },
    ba_street: {
        type: String
    },
    ba_number: {
        type: Number
    },
    ba_country: {
        type: String
    },
    ba_locality: {
        type: String
    },
    ba_city: {
        type: String
    },
    ba_geometry: {
        type: Array
    },
    ba_active: {
        type: Boolean
    }
}, {
    collection: 'branchAddress',
    timestamps: true
});

module.exports = mongoose.model('BranchAddress', BranchAddress);
