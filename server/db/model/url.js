const Sequelize = require('sequelize');
const db = require('../_db');

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
    encode: (id) => {
      const char = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
      const length = char.length;
      let shortenUrl = '';
      while(id>0){
        shortenUrl = char.charAt(id%length) + shortenUrl;
        id = Math.floor(id/length);
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
