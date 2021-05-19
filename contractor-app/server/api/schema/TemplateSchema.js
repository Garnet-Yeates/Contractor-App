const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    fields: {
        type: Array,
        required: true,
    },
})

module.exports = TemplateSchema;