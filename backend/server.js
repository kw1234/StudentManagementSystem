const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const userService = require('./services/userService');
const weeklyService = require('./services/weeklyService.js');
const statusReport = require('./services/statusReportService.js');
const tutorService = require('./services/tutorService.js');
const adminService = require('./services/adminService.js');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const app = express();

const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0-1jamj.mongodb.net/StudentSystem?retryWrites=true&w=majority`;

app.use(bodyParser.json());

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

api.post('/postData', weeklyService.postData);
api.get('/getData', weeklyService.getData);
api.post('/statusReport/postData', statusReport.postData);
api.get('/statusReport/getData', statusReport.getData);

api.post('/tutor/updateStudentList', tutorService.updateStudentList);
api.get('/tutor/getStudents', tutorService.getStudents);
api.post('/admin/updateTutorList', adminService.updateTutorList);
api.get('/admin/getTutors', adminService.getTutors);
api.get('/student/getClassList', userService.getStudentClassList);
api.post('/student/updateClassList', userService.editStudentClassList);

api.get('/user/me', checkAuthenticated, userService.getUserProfile);
api.post('/user/me', checkAuthenticated, userService.editUserProfile);

auth.post('/login', userService.login);
auth.post('/register', userService.register);

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
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, '/frontend', 'index.html'));
});
