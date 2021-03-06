const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async function (req, res) {
  const { password } = req.body;
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const role = req.body.role;

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptedPassword,
    role,
  };

  if (!validateUser(user)) {
    res.status(400).end('Error in the register request: email or role entry was not valid');
  } else {
    // add the user info to the database
    if (role === 'admin') {
      user.tutorList = [];
    } else if (role === 'tutor') {
      user.studentList = [];
    } else if (role === 'student') {
      user.classList = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    }
    postUser(res, req.app.client, user).catch((error) => {
      res.status(400).end(`Error in the register request: ${error.message}`);
    });
  }
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
      sendAuthError(res, 'failure to login, email or password did not match');
    }
  } else {
    sendAuthError(res, 'user was not found');
  }
};

exports.editUserProfile = async function (req, res) {
  const email = req.body.email;
  const role = req.body.role;
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  editUser(req.app.client, { email }, user).catch((error) => {
    res.status(400).end(`Error in the post planner data request: ${error.message}`);
  });
  res.status(200);
};

exports.getUserProfile = async function (req, res) {
  const query = req.query;
  const email = query.email;

  const user = await getUser(req.app.client, email).catch((error) => {
    res.status(400).end(`Error in the login request: ${error.message}`);
  });

  if (user) {
    res.send(user);
  } else {
    sendAuthError(res, 'user profile was not found');
  }
};

exports.getStudentClassList = async function (req, res) {
  const query = req.query;
  const email = query.email;

  const classList = await getClassList(req.app.client, email).catch((error) => {
    res.status(400).end(`Error in the get student classList request: ${error.message}`);
  });

  res.send({ classList: classList });
};

exports.editStudentClassList = async function (req, res) {
  const email = req.body.email;
  const user = {
    classList: req.body.classList,
  };

  await editClassList(req.app.client, { email }, user).catch((error) => {
    res.status(400).end(`Error in the edit student classList request: ${error.message}`);
  });
  res.status(200);
};

async function postUser(res, client, user) {
  const result = await client.db('StudentSystem').collection('Users').insertOne(user);
  console.log(`New user created with the following id: ${result.insertedId}`);
  sendToken(res, user);
}

async function getUser(client, email) {
  const result = await client.db('StudentSystem').collection('Users').findOne({ email });
  return result;
}

async function editUser(client, key, val) {
  console.log(key, val.firstName, val.lastName, val.role);
  await client.db('StudentSystem').collection('Users').update(key, { $set: val });
  console.log(`User ${key.email} was edited`);
}

async function getClassList(client, email) {
  const result = await client.db('StudentSystem').collection('Users').findOne({ email });
  if (result) return result.classList;
  return result;
}

async function editClassList(client, key, val) {
  console.log(key, val.classList);
  await client.db('StudentSystem').collection('Users').update(key, { $set: val });
  console.log(`User ${key.email}'s classList was edited`);
}

function sendToken(res, user) {
  // usually, would not hardcode this secret (the second param in the jwt.sign() call)
  // but, not sure how else to keep this secret so keeping it here for now
  const token = jwt.sign(user.email, '123');
  res.json({ firstName: user.firstName, token, role: user.role });
}

function sendAuthError(res, message) {
  console.log('error in auth');
  return res.json({ success: false, message });
}

function validateUser(user) {
  return emailValid(user.email) && roleValid(user.role);
}

function emailValid(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email !== '' && regex.test(email);
}

function roleValid(role) {
  const roles = ['student', 'tutor', 'admin'];
  return roles.includes(String(role).toLowerCase());
}
