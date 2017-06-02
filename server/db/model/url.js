const Sequelize = require('sequelize');
const db = require('../_db');

var Url = db.define('url',{
  url: {
    type: Sequelize.STRING
  },
  shortenUrl: {
    type: Sequelize.STRING,
    validate: {
      isUnique: (sUrl) => {
        Url.find
      }
    }
  },
  clickCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
},{
  // hashing with id
  classMethods: {

    encode: (id) => {
      const char = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
      const length = char.length;
      let shortenUrl = '';

      while(id>0){
        shortenUrl = char.charAt(id%length) + shortenUrl;
        id = Math.floor(id/length);
      }

      const checkExist = (sUrl) => {
        Url.find({
          where: { shortenUrl: sUrl }
        })
        .then((url) => {
          if(url) return true;
          else return false
        })
      }
      // create unpreditable url also check unique in database
      while(shortenUrl.length<5 && !checkExist(shortenUrl)){
        var str = Math.random().toString(36);
        shortenUrl+= str.substring(str.length-1);
      }

      return shortenUrl;

      // method 1
      // var d = new Date();
      // shortenUrl = d.getTime();

      // method 2
      // use crypto
    }
  },
  // afterCreate data in database, insert the shorten url by calling encode()
  hooks: {
    afterCreate: (url) => {
      if(!url.shortenUrl){
        let sUrl = url.Model.encode(url.id);
        return url.updateAttributes({ shortenUrl: sUrl});
      }
    }
  }
});

module.exports = Url;

