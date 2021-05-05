const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    isEmpty = require('is-empty'),
    User = mongoose.model('User');


/**
 * Checks to see if the supplied username is taken. If so, this function
 * will automatically send a 409 conflict back to the user as a json object
 * with the property usernameError="Username Taken" and the function will return true.
 * If there is an error querying the database, it will send a 500 internal server error
 * back and the function will also return true. To use this function, call
 * 'if (await usernameTaken(username, res))' and return if this is true.
 * @param {string} username 
 * @returns true if this username is taken or there was an error querying the database
 */

 const getDuplicateFieldNameError = async (fieldName, fieldValue, errorText) => {
    return await User.findOne({
        [fieldName]: fieldValue,
    }).exec()
        .then(user => user && { [fieldName]: errorText })
        .catch(err => ({ internalError: 'Internal error querying database' }));
}

const getUsernameTakenError = async (username) => {
    return await getDuplicateFieldNameError('identifier', username, 'Username taken')
}

const getEmailTakenError = async (email) => {
    return await getDuplicateFieldNameError('email', email, 'Email taken');
}

const getUsernameErrors = async (username) => {
    if (!username)
        return { username: 'Please enter username' };
    return await getUsernameTakenError(username);
}

const getEmailErrors = async (email) => {
    if (!email)
        return { email: 'Please enter email' }
    return await getEmailTakenError(email);
}

const anyUppercase = (str) => {
    console.log(str)
    for (let character of str) {
        console.log(character)
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
    console.log("any upper?", anyUppercase(password))
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
