const express = require('express');
const Url = require('../db/model/url');

const router = express.Router();

module.exports = () => {

  // index route
  router.get('/', (req, res, next) => {
    return res.render('index');
  });

  // render all the urls in showAllUrl.html
  router.get('/showAllUrl', (req, res, next) => {
    return Url.findAll()
    .then((allUrls) => {
      res.render('showAllUrl', {allUrls: allUrls});
    })
    .catch(next);
  });

  // when user enter shorten url in browser
  router.get('/:sUrl', (req, res, next) => {
    return Url.findOne({
      where: { shortenUrl: req.params.sUrl }
    })
    .then((url) => {
      res.redirect(url.url);
    })
    .catch(next);
  });

  // insert new url into database
  router.post('/', (req, res, next) => {
    return Url.create(req.body)
    .then((url) => {
      res.json(url);
    })
    .catch(next);
  });

  return router;
};

