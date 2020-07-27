var express = require('express');
const path = require("path");
const app = express();
//var csvService = require('./routes/csvService.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());


var router = express.Router();


router.get('/', function(req, res, next) {
	next();
    });

app.use('/', router);
app.use(express.static('frontend'));

app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

var api = express.Router();

app.get('/', function(req, res) {
        res.send("hello");
    });

/*api.post('/upload', csvService.uploadFile);

api.post('/download', csvService.downloadFile);

api.get('/getFileNames', csvService.getFileNames);

api.post('/delete', csvService.deleteFile);

api.post('/getPage', csvService.getPage);*/

app.use('/api', api);

app.listen(8080);