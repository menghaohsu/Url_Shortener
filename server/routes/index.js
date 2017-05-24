const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = () => {

	router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'))
  });
	return router;
}