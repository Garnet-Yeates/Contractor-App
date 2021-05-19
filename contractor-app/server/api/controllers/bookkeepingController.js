'use strict';
const mongoose = require('mongoose');
const isEmpty = require('is-empty');
const User = mongoose.model('User');
const UserSchema = require('../schema/UserSchema');

const getTemplateNameErrors = async (templateName) => {
    return await User.findOne({
        'templates.name': templateName,
    }).exec()
        .then(user => user && { templateName: "Template with this name already exists" })
        .catch(() => ({ internalError: 'Internal error querying database' }));
}

/**
 * Client must send array of fields where 0 is the top field
 * @param {} fields 
 */
const getTemplateContentErrors = async (fields) => {
    const errArray = new Array(fields.length);
    let err = false;

    fields.forEach((field, index) => {
        if (!field.name) {
            err = true;
            errArray[index] = "Please Enter Field Name";
        }
    });

    fields.forEach((field, index) => {
        fields.forEach((other, otherIndex) => {
            if (other !== field
                && field.name
                && field.name !== ""
                && field.name.toUpperCase() === other?.name?.toUpperCase()) {
                err = true;
                errArray[index] = "Duplicate Field"
                errArray[otherIndex] = "Duplicate Field"
            }
        })
    });

    return err ? { fields: errArray } : {};
}

const getTemplateErrors = async (template) => {
    return {
        ...await getTemplateNameErrors(template.name),
        ...await getTemplateContentErrors(template.fields)
    }
}

exports.addTemplateEntry = async (req, res) => {
    const { userID, body: { templateName } } = req;
    User.findOne({
        _id: userID,
    }, `${templateName}`, (err, user) => {
        if (!user.templateName);
    })
    let UserClone = UserSchema.clone();
    UserClone.add({
        [templateName]: Array,
    });
    mongoose.model('User', UserSchema)
}

exports.fakeCreate = () => {
    let req = {
        userID: "60a49ab537eece2b50951af1",
        body: {
            template: {
                name: "Fu",
                fields: [
                    {
                        name: "Age",
                        type: "Text",
                    },
                    {
                        name: "Height",
                        type: "Text",
                    },

                ]
            }
        },
    }
    this.createTemplate(req);
}

exports.createTemplate = async (req, res) => {
    const { userID, body: { template } } = req;
    const errors = await getTemplateErrors(template);
    if (errors.internalError)
        return res.status(500).json({ internalError: 'Internal error querying database' })
    if (!isEmpty(errors))
        return res.status(409).json(errors);
    User.findOne({
        _id: userID
    }, `templates templateEntries.${template.name}`, (err, user) => {
        if (err)
            return res.status(500).json({ internalError: 'Internal error querying database' })
        !user.templateEntries && (user.templateEntries = {});
        user.templates.push(template)
        user.set(`templateEntries.${template.name}`, [])
        user.save((err) => {
            console.log(err);
            if (err)
                return res.status(500).json({ internalError: 'Internal error saving template to database' });
            else
                return res.send('Template created Successfully')
        });
    });
}

