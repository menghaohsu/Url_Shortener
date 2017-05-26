const express = require('express');
const Url = require('../db/model/url')
const path = require('path');

const router = express.Router();

module.exports = () => {

	router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/index.html'), (err)=>{
    	if(err) next(err);
    })
  });

  router.post('/', (req, res, next) => {
  	Url.create(req.body)
  	.then((url) => {
  		res.json(url);
  	})
  	.catch(next);
  });

	return router;
}

