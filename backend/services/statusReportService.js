const validate = require('jsonschema').validate;
var moment = require('moment'); // require

exports.postData = async function (req, res) {
  res.status(200);
};

exports.getData = async function (req, res) {
  const query = req.query;
  const email = query.email;
  const weekId = query.weekId;

  res.send(email);
};
