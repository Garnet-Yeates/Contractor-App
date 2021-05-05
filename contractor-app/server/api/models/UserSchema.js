// Sign up schema - what to collect from user
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
    Schema = mongoose.Schema;

//Defines mongoose schema for user accounts
const UserSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    identifier:{ // same as username, but always lowercase 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    username:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    hashPassword: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('User', UserSchema)