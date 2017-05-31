const express = require('express');
const routes = require('./routes');
const swig = require('swig');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
console.log("server listening")

app.engine('html', swig.renderFile);
app.set('view engine','html')
app.set('views', __dirname+'/views/');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes());

app.use(express.static('public'));

// failed to catch req above means 404, forward to error handler
app.use((req, res, next) =>{
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle any errors
app.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// listen on a port
const port = 3000;
app.listen(port, () => {
  console.log('The server is listening closely on port', port);
  db.sync()
  .then(() => {
    console.log('Sync the database');
  })
  .catch((err) => {
    console.error('Trouble right here in River City', err, err.stack);
  });
});

