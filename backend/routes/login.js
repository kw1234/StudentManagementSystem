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

  // add the user info to the database
  postUserEntry(res, user).catch(console.error);
};

exports.login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await getUser(email);

  if (user) {
    const comparison = await bcrypt.compare(password, user.password);
    if (comparison) {
      sendToken(res, user);
    } else {
      sendAuthError(res);
    }
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

exports.getUser = async function (req, res) {
  const email = req.user;

  // this is a get of an existing users info that populates the user info view with information on init
};

function sendToken(res, user) {
  // usually, would not hardcode this secret (the second param in the jwt.sign() call)
  // but, not sure how else to keep this secret so keeping it here for now
  const token = jwt.sign(user.email, '123');
  res.json({ firstName: user.firstName, token });
}

async function postUserEntry(res, entry) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    await createUserEntry(res, client, entry);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function getUserEntry(email) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const user = await getUser(client, entry);
    return user;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function createUserEntry(res, client, entry) {
  try {
    const result = await client.db('StudentSystem').collection('Users').insertOne(entry);
    console.log(`New user created with the following id: ${result.insertedId}`);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).end('Error in the create user request: ' + error.message);
  }
}

async function getUser(client, email) {
  try {
    const result = await client.db('StudentSystem').collection('Users').findOne({ email: email });

    if (result) {
      return result;
    }
    console.log(`No categories found with the name '${email}'`);
    return result;
  } catch (error) {
    return 'Error in the get category request: ' + error.message;
  }
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
