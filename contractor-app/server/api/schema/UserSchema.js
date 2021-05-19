const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    TemplateSchema = require('../schema/TemplateSchema');

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    identifier: { // same as username, but always lowercase 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    hashPassword: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    templates: [TemplateSchema],
    templateEntries: {},
}, { strict: false })

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hashPassword);
};

module.exports = UserSchema;