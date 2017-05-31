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
      if(!url) next();
      else {
        url.updateAttributes({
          clickCount: url.clickCount+1
        })
        .then(() => {
          res.redirect(url.url);
        })
      }
    })
    .catch(next);
  });

  // insert new url into database
  router.post('/', (req, res, next) => {
    if(req.body.shortenUrl){
      return Url.find({
        where: { shortenUrl: req.body.shortenUrl }
      })
      .then((url) => {
        if(!url){
          Url.create(req.body)
          .then((newUrl) => {
            res.json(newUrl)
          })
        }else {
          res.status(500).send('Url Already Being Used');
        }
      })
    }else{
      return Url.find({
        where: { url: req.body.url }
      })
      .then((url) => {
        if(!url){
          Url.create(req.body)
          .then((newUrl) => {
            res.json(newUrl)
          })
        }else res.json(url);
      })
      .catch(next);
    }
  });

  return router;
};

