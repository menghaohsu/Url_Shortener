const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('url',{
	url: {
		type: Sequelize.STRING
	},
	shortenUrl: {
		type: Sequelize.STRING
	}
});