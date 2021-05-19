const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    isEmpty = require('is-empty'),
    emailValidator = require('email-validator'),
    User = mongoose.model('User');

const getDuplicateFieldNameError = async (fieldName, errFieldName, fieldValue, errorText) => {
    return await User.findOne({
        [fieldName]: fieldValue,
    }).exec()
        .then(user => user && { [errFieldName]: errorText })
        .catch(() => ({ internalError: 'Internal error querying database' }));
}

const getUsernameTakenError = async (username) => {
    return await getDuplicateFieldNameError('identifier', 'username', username, 'Username taken')
}

const getEmailTakenError = async (email) => {
    return await getDuplicateFieldNameError('email', 'email', email, 'Email taken');
}

const getUsernameErrors = async (username) => {
    if (!username)
        return { username: 'Please enter username' };
    return await getUsernameTakenError(username);
}

const getEmailErrors = async (email) => {
    if (!email)
        return { email: 'Please enter email' }
    if (!emailValidator.validate(email))
        return { email: 'Invalid Email' }
    return await getEmailTakenError(email);
}

const anyUppercase = (str) => {
    for (let character of str) {
        if (character === character.toUpperCase() && character !== character.toLowerCase())
            return true
    }
    return false;
}

const getPasswordErrors = async (password, confirmPassword) => {
    if (!password)
        return { password: 'Please enter password' }
    if (password !== confirmPassword)
        return { password: 'Passwords do not match', confirmPassword: 'Passwords do not match' }
    if (!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password) || !anyUppercase(password) || password.length < 8)
        return { password: 'Passwords must be at least 8 characters and contain a special character and uppercase letter' }
}

const getFullNameErrors = async (fullName) => {
    if (!fullName) {
        return { fullName: 'Please enter full name' }
    }
}

module.exports = {
    getDuplicateFieldNameError,
    getEmailErrors,
    getFullNameErrors,
    getPasswordErrors,
    getUsernameErrors,
    getUsernameTakenError,
    getEmailTakenError,
}
