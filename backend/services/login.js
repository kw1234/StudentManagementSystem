const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async function (req, res) {
  const { password } = req.body;
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptedPassword,
    role: req.body.role,
  };

  console.log(user);

  // add the user info to the database
  postUser(res, req.app.client, user).catch((error) => {
    res.status(400).end(`Error in the register request: ${error.message}`);
  });
};

exports.login = async function (req, res) {
  const { email } = req.body;
  const { password } = req.body;

  const user = await getUser(req.app.client, email).catch((error) => {
    res.status(400).end(`Error in the login request: ${error.message}`);
  });
  console.log(user);

  if (user) {
    const comparison = await bcrypt.compare(password, user.password);
    if (comparison) {
      sendToken(res, user);
    } else {
      sendAuthError(res);
    }
  } else {
    sendAuthError(res);
  }

  // do a get from the database and decrypt the encrypted password stored there
  // if the password matches, send an authentication token
  // if it does not match, send an auth error
};

exports.saveUser = async function (req, res) {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  console.log(user);
  // this is a put of an existing users info
};

exports.editUser = async function (req, res) {
  const email = req.user;

  // this is a get of an existing users info that populates the user info view with information on init
};

async function postUser(res, client, user) {
  const result = await client.db('StudentSystem').collection('Users').insertOne(user);
  console.log(`New user created with the following id: ${result.insertedId}`);
  sendToken(res, user);
}

async function getUser(client, email) {
  const result = await client.db('StudentSystem').collection('Users').findOne({ email: email });
  console.log(result);
  return result;
}

function sendToken(res, user) {
  // usually, would not hardcode this secret (the second param in the jwt.sign() call)
  // but, not sure how else to keep this secret so keeping it here for now
  const token = jwt.sign(user.email, '123');
  res.json({ firstName: user.firstName, token, role: user.role });
}

function sendAuthError(res) {
  console.log('error in auth');
  return res.json({ success: false, message: 'email or password incorrect' });
}
