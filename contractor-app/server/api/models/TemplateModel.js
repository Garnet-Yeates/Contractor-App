const mongoose = require('mongoose')
const TemplateSchema = require('../schema/TemplateSchema');
module.exports = mongoose.model('Template', TemplateSchema)