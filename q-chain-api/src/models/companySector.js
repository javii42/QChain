const mongoose = require('mongoose');

const {
    Schema,
    Types: { ObjectId }
} = mongoose;

const CompanySector = new Schema({
    cs_id: ObjectId,
    company_id: {
        type: ObjectId,
        required: true,
        ref: 'company'
    },
    cs_desc: {
        type: String
    },
    cs_employees: {
        type: Array
    },
    cs_active: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'companySector',
    timestamps: true
});

module.exports = mongoose.model('CompanySector', CompanySector);
