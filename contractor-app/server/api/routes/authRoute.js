module.exports = function (app) {
    const authController = require('../controllers/authController.js');
    app.route('/login')
        .post(authController.login);
    app.route('/register')
        .post(authController.register);
};