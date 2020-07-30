const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const weeklyService = require('./routes/weeklyService.js');

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

app.get('/', function (req, res) {
  res.send('hello');
});

api.post('/saveData', weeklyService.saveData);

/*
api.post('/upload', csvService.uploadFile);

api.post('/download', csvService.downloadFile);

api.get('/getFileNames', csvService.getFileNames);

api.post('/delete', csvService.deleteFile);

api.post('/getPage', csvService.getPage);
*/

app.use('/api', api);

app.listen(8080);
