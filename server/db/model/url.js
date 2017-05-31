const Sequelize = require('sequelize');
const db = require('../_db');

const char = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
const length = char.length;

module.exports = db.define('url',{
  url: {
    type: Sequelize.STRING
  },
  shortenUrl: {
    type: Sequelize.STRING
  }
},{
  // hashing with id
  classMethods: {
    encode: (num) => {
      let shortenUrl = '';
      while(num>0){
        shortenUrl = char.charAt(num%length) + shortenUrl;
        num = Math.floor(num/length);
      }
      return shortenUrl;
    }
  },
  // afterCreate data in database, insert the shorten url by calling encode()
  hooks: {
    afterCreate: (url) => {
      let sUrl = url.Model.encode(url.id);
      return url.updateAttributes({ shortenUrl: sUrl});
    }
  }
});
