'use strict';
const mongoose = require('mongoose');

exports.getTemplates = (req, res) => {

}

exports.postTemplate = (req, res) => {

}

exports.getEntries = (req, res) => {

}

exports.postEntry = (req, res) => {
    console.log(req.body);
    return res.json({msg : "PONG"})
}

