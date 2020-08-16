if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0-1jamj.mongodb.net/StudentSystem?retryWrites=true&w=majority`;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async function (req, res) {
  const password = req.body.password;
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptedPassword,
  };
};

exports.login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
};

exports.saveUser = async function (req, res) {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  console.log(user);
};

exports.getUser = async function (req, res) {
  const email = req.user;
};

function sendToken(user, res) {
  // usually, would not hardcode this secret (the second param in the jwt.sign() call)
  // but, not sure how else to keep this secret so keeping it here for now
  const token = jwt.sign(user.email, '123');
  res.json({ firstName: user.firstName, token });
}

function sendGetUserInfoError(res) {
  console.log('error in getting user info');
  return res.json({ success: false, message: 'error in getting user info' });
}

function sendSaveUserInfoError(res) {
  console.log('error in saving user info');
  return res.json({ success: false, message: 'error in saving user info' });
}

function sendAuthError(res) {
  console.log('error in auth');
  return res.json({ success: false, message: 'email or password incorrect' });
}

function sendRegistrationError(res, error) {
  console.log('error in registration');
  return res.json({ success: false, message: 'error in registering: ' + error });
}
