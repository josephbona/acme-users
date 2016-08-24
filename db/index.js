var configTest = require('../config/config.test.json');
var config = require('../config/config.json');
var Sequelize = require('sequelize');
var dbConfig;
// process.env.TEST === true ? dbConfig = configTest : dbConfig = config;

module.exports = new Sequelize(configTest.database, configTest.username, configTest.password, configTest);