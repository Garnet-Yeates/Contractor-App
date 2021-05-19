'use strict';
const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    isEmpty = require('is-empty'),
    User = mongoose.model('User'),
    { getEmailErrors, getFullNameErrors, getPasswordErrors, getUsernameErrors } = require('../util/registerErrorHandlers');


exports.register = async (req, res) => {
    const { fullName, username, email, password, confirmPassword } = req.body;

    const errors = {
        ...await getUsernameErrors(username),
        ...await getEmailErrors(email),
        ...await getFullNameErrors(fullName),
        ...await getPasswordErrors(password, confirmPassword),
    };
    if (errors.internalError)
        return res.status(500).json({ internalError: 'Internal error querying MongoDB database' })
    if (!isEmpty(errors))
        return res.status(409).json(errors);
    let newUser = new User({ ...req.body, identifier: username });
    newUser.hashPassword = bcrypt.hashSync(password, 10);
    newUser.save((err) => {
        if (err)
            return res.status(500).json({ internalError: 'Internal error saving user to MongoDB database' });
        else
            return res.send('Registered Successfully')
    });
}

exports.login = (req, res) => {
    let { username, password } = req.body
    User.findOne({
        identifier: username
    }, function (err, user) {
        if (err)
            return res.status(500).json({ internalError: "Internal error querying MongoDB database" })
        if (!user)
            return res.status(404).json({ resetField: false, username: "User not found" })
        if (!user.comparePassword(password))
            return res.status(401).json({ resetField: true, password: 'Authentication failed' });

        let userTokenInfo = { userID: user.toJSON()._id }

        jwt.sign(userTokenInfo,
            process.env.JWT_KEY,
            { expiresIn: '360000s' }, // 100 hour
            (err, token) => {
                if (err)
                    return res.status(500).json({ internalError: 'Error signing JWT token' });
                return res.json({
                    msg: 'Login Successful',
                    token: 'Bearer ' + token
                })
            }
        );
        return
    })
}

