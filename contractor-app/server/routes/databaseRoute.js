module.exports = function (app) {
    const databaseController = require('../controllers/databaseController.js');
    app.route('/database/templates')
        .get(databaseController.getTemplates)
        .post(databaseController.postTemplate);
    app.route('/database/entries')
        .get(databaseController.getEntries)
        .post(databaseController.postEntry);
};