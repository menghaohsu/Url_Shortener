const db = require('./server/db');
const Url = db.model('url');
const Promise = require('sequelize').Promise;

const seedUrls = () => {
  const urls = ['https://www.google.com/',
                'https://www.wizeline.com/',
                'https://www.facebook.com/',
                'https://www.yahoo.com/',
                'http://www.nba.com/',
                'https://www.linkedin.com/',
                'https://github.com/',
                'https://www.netflix.com/'];

  const templateUrl = [], max = urls.length, min = 0;
  for(let i=0; i<1000; i++){
    templateUrl.push(urls[Math.floor(Math.random()*(max-min))+min]);
  }

  const createUrls = templateUrl.map((url) => Url.create({ url: url }));

  return Promise.all(createUrls);
};

db.sync({ force: true })
  .then(() => seedUrls())
  .then(() => {
    console.log('Seed success!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

