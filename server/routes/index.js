const express = require('express');
const Url = require('../db/model/url')
const path = require('path');

const router = express.Router();

module.exports = () => {

  router.get('/', (req, res, next) => {
    return res.render('index');
  });

  router.get('/showAllUrl', (req, res, next) => {
    return Url.findAll()
    .then((allUrls) => {
      res.render('showAllUrl', {allUrls: allUrls});
    })
    .catch(next);
  });

  router.get('/:id', (req, res, next) => {
    return Url.findOne({
      where: { shortenUrl: req.params.id }
    })
    .then((url) => {
      res.redirect(url.url);
    })
    .catch(next);
  });

  router.post('/', (req, res, next) => {
    return Url.create(req.body)
    .then((url) => {
      res.json(url);
    })
    .catch(next);
  });

  return router;
};

