const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const login = require('./services/login');
const weeklyService = require('./services/weeklyService.js');
const tutorService = require('./services/tutorService.js');
const adminService = require('./services/adminService.js');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const app = express();

const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0-1jamj.mongodb.net/StudentSystem?retryWrites=true&w=majority`;

app.use(bodyParser.json());

const router = express.Router();
router.get('/', function (req, res, next) {
  next();
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(function (err, database) {
  if (err) throw err;

  app.client = database;

  app.listen(8080);
  console.log('Listening on port 8080');
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
const auth = express.Router();

/*app.get('/', function (req, res) {
  res.send('hello');
});*/

api.post('/postData', weeklyService.postData);
api.get('/getData', weeklyService.getData);
api.post('/tutor/updateStudentList', tutorService.updateStudentList);
api.get('/tutor/getStudents', tutorService.getStudents);
api.post('/admin/updateTutorList', adminService.updateTutorList);
api.get('/admin/getTutors', adminService.getTutors);
api.get('/user/me', checkAuthenticated, login.getUserProfile);
api.post('/user/me', checkAuthenticated, login.editUserProfile);
api.get('/student/getClassList', login.getStudentClassList);
api.post('/student/updateClassList', login.editStudentClassList);

auth.post('/login', login.login);
auth.post('/register', login.register);

function checkAuthenticated(req, res, next) {
  if (!req.header('authorization')) {
    return res.status(401).send({ message: 'Unauthorized request. Missing authentication header' });
  }

  const token = req.header('authorization').split(' ')[1];
  const payload = jwt.decode(token, '123');

  if (!payload) {
    return res.status(401).send({
      message: 'Unauthorized request. Authentication header is invalid',
    });
  }

  req.user = payload;

  next();
}

app.use('/api', api);
app.use('/auth', auth);
