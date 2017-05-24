const Sequelize = require('sequelize');
const packageJson = require('../../package.json');

const packageJsonConfig = packageJson.config.database.postgres;

const db = new Sequelize(packageJsonConfig.database_uri, { logging: console.log });

module.exports = db;


