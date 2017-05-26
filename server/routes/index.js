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
  		res.status(200).send(url)
  	})
  	.catch(next);
  });

	return router;
}

const urlShortener = () => {
	const char = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
	const length = char.length;

	this.encode = (num) => {
		let shortenUrl = '';
		while(num>0){
			shortenUrl = char.charAt(num%length) + shortenUrl;
			num = Math.floor(num/length);
		}
		return shortenUrl;
	};

	this.decode = (str) => {
		let num = 0;
		for(let i=0; i<str.length; i+=1){
			num = num*length +char.indexOf(str.charAt(i));
		}
		return num;
	}
};

