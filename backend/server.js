const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const login = require('./routes/login');
const weeklyService = require('./routes/weeklyService.js');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

const router = express.Router();
router.get('/', function (req, res, next) {
  next();
});

app.use('/', router);
app.use(express.static('frontend'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

const api = express.Router();
var auth = express.Router();

app.get('/', function (req, res) {
  res.send('hello');
});

api.post('/saveData', weeklyService.saveData);

api.post('/getData', weeklyService.getData);

auth.post('/login', login.login);

auth.post('/register', login.register);

function checkAuthenticated(req, res, next) {
  if (!req.header('authorization')) {
    return res.status(401).send({ message: 'Unauthorized request. Missing authentication header' });
  }

  var token = req.header('authorization').split(' ')[1];
  var payload = jwt.decode(token, '123');

  if (!payload) {
    return res
      .status(401)
      .send({ message: 'Unauthorized request. Authentication header is invalid' });
  }

  req.user = payload;

  next();
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(8080);
