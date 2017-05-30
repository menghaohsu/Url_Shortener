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
  instanceMethods: {
    decode: (str) => {
      let num = 0;
      for(let i=0; i<str.length; i+=1){
        num = num*length +char.indexOf(str.charAt(i));
      }
      return num;
    }
  },
  hooks: {
    afterCreate: (url) => {
      let sUrl = url.Model.encode(url.id);
      return url.updateAttributes({ shortenUrl: sUrl});
    }
  }
});
