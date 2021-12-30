const loggerPlugin = require('./logger');

module.exports = app => {
    loggerPlugin(app)
};