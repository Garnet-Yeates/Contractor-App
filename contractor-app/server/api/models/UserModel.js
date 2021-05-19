const mongoose = require('mongoose')
const UserSchema = require('../schema/UserSchema');
module.exports = mongoose.model('User', UserSchema)